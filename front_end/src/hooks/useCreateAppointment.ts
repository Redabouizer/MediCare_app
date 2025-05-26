import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/api'; // Import the axios instance you created

interface CreateAppointmentData {
  doctor: string;  // Just a string
  service: string; // Just a string
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  symptoms?: string;
}
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentData) => {
      const response = await api.post('/appointments/', {
        doctor: data.doctor,  // Send as UUID string
        service: data.service, // Send as UUID string
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        symptoms: data.symptoms || '',
        notes: data.notes || ''
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment booked successfully! We will contact you shortly.');
    },
    onError: (error) => {
      console.error('Error creating appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    },
  });
};