from django.urls import path
from .views import DoctorListView, DoctorDetailView, DoctorScheduleListView

urlpatterns = [
    path('', DoctorListView.as_view(), name='doctor-list'),
    path('<uuid:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('<uuid:doctor_id>/schedules/', DoctorScheduleListView.as_view(), name='doctor-schedule-list'),
]