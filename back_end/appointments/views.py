from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentSerializer, CreateAppointmentSerializer
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime

# views.py
class AppointmentListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(patient=user)
    
    def get_serializer_class(self):
        return CreateAppointmentSerializer if self.request.method == 'POST' else AppointmentSerializer

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'doctor':
            return Appointment.objects.filter(doctor__profile=user)
        return Appointment.objects.filter(patient=user)
    
    def perform_update(self, serializer):
        instance = serializer.instance
        if 'status' in serializer.validated_data and instance.status != serializer.validated_data['status']:
            # Status changed - add any additional logic here
            pass
        serializer.save()

class AvailableTimeSlotsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        doctor_id = kwargs.get('doctor_id')
        date_str = kwargs.get('date')
        
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            if date < timezone.now().date():
                return Response({'error': 'Date cannot be in the past'}, status=400)
            
            # Get doctor's schedule for that day of week
            day_of_week = date.strftime('%A').lower()
            schedules = DoctorSchedule.objects.filter(
                doctor_id=doctor_id,
                day_of_week=day_of_week,
                is_available=True
            )
            
            if not schedules.exists():
                return Response({'error': 'Doctor not available on this day'}, status=400)
            
            schedule = schedules.first()
            
            # Generate time slots (30 minutes interval)
            start_time = schedule.start_time
            end_time = schedule.end_time
            
            # Get existing appointments for that day
            existing_appointments = Appointment.objects.filter(
                doctor_id=doctor_id,
                appointment_date=date,
                status__in=['pending', 'confirmed']
            ).values_list('appointment_time', flat=True)
            
            # Generate available time slots
            time_slots = []
            current_time = start_time
            
            while current_time < end_time:
                if current_time not in existing_appointments:
                    time_slots.append(current_time.strftime('%H:%M'))
                
                # Add 30 minutes
                current_hour = current_time.hour
                current_minute = current_time.minute + 30
                if current_minute >= 60:
                    current_hour += 1
                    current_minute -= 60
                current_time = current_time.replace(hour=current_hour, minute=current_minute)
            
            return Response({'available_slots': time_slots})
        
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=400)