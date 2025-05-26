from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'name', 'role', 'phone', 'address', 'date_of_birth']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }
    
    def get_name(self, obj):
        # Return full name if available, otherwise return email
        full_name = f"{obj.first_name} {obj.last_name}".strip()
        return full_name if full_name else obj.email.split('@')[0]

    def validate(self, attrs):
        if 'password' not in attrs:
            raise serializers.ValidationError({"password": "This field is required."})
        
        password = attrs['password']
        password2 = attrs.get('password2', password)
        
        if password != password2:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        return attrs

    def create(self, validated_data):
        # Handle name field
        name = validated_data.pop('name', '')
        email = validated_data['email']
        
        validated_data['first_name'] = name.split()[0] if name else email.split('@')[0]
        validated_data['last_name'] = ' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
        
        validated_data.pop('password2', None)
        
        try:
            user = User.objects.create_user(**validated_data)
            return user
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims if desired
        token['email'] = user.email
        token['role'] = user.role
        return token
