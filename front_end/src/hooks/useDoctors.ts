
import { useQuery } from '@tanstack/react-query';

// Mock doctors data
const mockDoctors = [
  {
    id: '1',
    specialty: 'Cardiology',
    license_number: 'MD001234',
    years_experience: 15,
    education: 'MD from Harvard Medical School',
    bio: 'Renowned cardiologist with over 15 years of experience in treating heart conditions.',
    consultation_fee: 200,
    is_available: true
  },
  {
    id: '2',
    specialty: 'Neurology',
    license_number: 'MD005678',
    years_experience: 12,
    education: 'MD from Stanford University',
    bio: 'Specialist in neurological disorders with extensive experience.',
    consultation_fee: 250,
    is_available: true
  },
  {
    id: '3',
    specialty: 'General Practice',
    license_number: 'MD009012',
    years_experience: 8,
    education: 'MD from University of California',
    bio: 'Provides comprehensive primary care services.',
    consultation_fee: 100,
    is_available: true
  },
  {
    id: '4',
    specialty: 'Pediatrics',
    license_number: 'MD003456',
    years_experience: 10,
    education: 'MD from Yale School of Medicine',
    bio: 'Dedicated to providing exceptional medical care for children.',
    consultation_fee: 120,
    is_available: true
  },
  {
    id: '5',
    specialty: 'Orthopedic Surgery',
    license_number: 'MD007890',
    years_experience: 18,
    education: 'MD from University of Pennsylvania',
    bio: 'Experienced orthopedic surgeon specializing in joint replacement.',
    consultation_fee: 180,
    is_available: true
  },
  {
    id: '6',
    specialty: 'Ophthalmology',
    license_number: 'MD002468',
    years_experience: 14,
    education: 'MD from Columbia University',
    bio: 'Expert ophthalmologist providing comprehensive eye care.',
    consultation_fee: 150,
    is_available: true
  }
];

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDoctors;
    },
  });
};
