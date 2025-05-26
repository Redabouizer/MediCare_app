
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
import { useDoctors } from '@/hooks/useDoctors';
import { useCreateAppointment } from '@/hooks/useCreateAppointment';
import { toast } from 'sonner';

const Appointment = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const createAppointment = useCreateAppointment();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!formData.service || !formData.doctor || !formData.date || !formData.time) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await createAppointment.mutateAsync({
        doctor: formData.doctor,
        service: formData.service,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: formData.message,
        symptoms: formData.message
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Appointment creation error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to book an appointment with our medical professionals.</p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Go to Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6">Make an Appointment</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Schedule your appointment with our experienced medical professionals. We're here to provide you with
            the best healthcare services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Service *
                  </Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder={servicesLoading ? "Loading services..." : "Select a service"} />
                    </SelectTrigger>
                    <SelectContent>
                      {services?.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Preferred Doctor
                  </Label>
                  <Select value={formData.doctor} onValueChange={(value) => handleInputChange('doctor', value)}>
                    <SelectTrigger className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder={doctorsLoading ? "Loading doctors..." : "Select a doctor"} />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors?.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          Dr. {doctor.specialty} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-slate-700">
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Preferred Time *
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Additional Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Please describe your symptoms or any specific concerns..."
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a request for an appointment. Our staff will contact you within 24 hours to confirm
                  your appointment time and provide any additional instructions.
                </p>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={createAppointment.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  {createAppointment.isPending ? 'Booking Appointment...' : 'Book Appointment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Appointment;
