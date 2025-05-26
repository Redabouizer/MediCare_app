from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Doctor, DoctorSchedule

class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    profile = UserSerializer(read_only=True)
    schedules = DoctorScheduleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Doctor
        fields = '__all__'