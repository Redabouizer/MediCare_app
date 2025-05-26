from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    CustomTokenObtainPairView, 
    UserRegistrationView, 
    UserProfileView,
    CurrentUserView  # Add this import
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', UserRegistrationView.as_view(), name='register'),
    path('api/auth/profile/', UserProfileView.as_view(), name='profile'),
    path('api/auth/user/', CurrentUserView.as_view(), name='current_user'),  # Add this line
    
    # Apps
    path('api/services/', include('services.urls')),
    path('api/doctors/', include('doctors.urls')),
    path('api/appointments/', include('appointments.urls')),
]