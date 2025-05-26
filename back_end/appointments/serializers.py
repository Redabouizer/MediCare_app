from rest_framework import serializers
from .models import Appointment
from django.utils import timezone
from datetime import datetime

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class CreateAppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(max_length=255)  # Just a string field
    service = serializers.CharField(max_length=255) # Just a string field

    class Meta:
        model = Appointment
        fields = ['doctor', 'service', 'appointment_date', 'appointment_time', 'symptoms', 'notes']
        extra_kwargs = {
            'symptoms': {'required': False, 'allow_blank': True},
            'notes': {'required': False, 'allow_blank': True}
        }

    def validate(self, data):
        # Validate date is not in the past
        if data['appointment_date'] < timezone.now().date():
            raise serializers.ValidationError({
                'appointment_date': 'Appointment date cannot be in the past'
            })

        # Validate time format if it's a string
        if isinstance(data['appointment_time'], str):
            try:
                data['appointment_time'] = datetime.strptime(data['appointment_time'], '%H:%M').time()
            except ValueError:
                raise serializers.ValidationError({
                    'appointment_time': 'Invalid time format. Use HH:MM'
                })

        # No doctor/service model validation - just accept the strings
        return data

    def create(self, validated_data):
        validated_data['patient'] = self.context['request'].user
        return Appointment.objects.create(**validated_data)