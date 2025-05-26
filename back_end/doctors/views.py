from rest_framework import generics
from .models import Doctor, DoctorSchedule
from .serializers import DoctorSerializer, DoctorScheduleSerializer

class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.filter(is_available=True)
    serializer_class = DoctorSerializer
    permission_classes = []

class DoctorDetailView(generics.RetrieveAPIView):
    queryset = Doctor.objects.filter(is_available=True)
    serializer_class = DoctorSerializer
    permission_classes = []

class DoctorScheduleListView(generics.ListAPIView):
    serializer_class = DoctorScheduleSerializer
    permission_classes = []

    def get_queryset(self):
        doctor_id = self.kwargs['doctor_id']
        return DoctorSchedule.objects.filter(doctor_id=doctor_id, is_available=True)