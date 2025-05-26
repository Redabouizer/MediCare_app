from django.urls import path
from .views import AppointmentListView, AppointmentDetailView, AvailableTimeSlotsView

urlpatterns = [
    path('', AppointmentListView.as_view(), name='appointment-list'),
    path('<uuid:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('doctors/<uuid:doctor_id>/available-slots/<str:date>/', AvailableTimeSlotsView.as_view(), name='available-slots'),
]