
import { useQuery } from '@tanstack/react-query';

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'General Medical Consultation',
    description: 'Comprehensive health check-up and consultation with our general practitioners',
    duration_minutes: 30,
    price: 100,
    is_active: true
  },
  {
    id: '2',
    name: 'Cardiology Consultation',
    description: 'Specialized heart and cardiovascular system examination',
    duration_minutes: 45,
    price: 200,
    is_active: true
  },
  {
    id: '3',
    name: 'Neurology Consultation',
    description: 'Brain and nervous system examination and consultation',
    duration_minutes: 60,
    price: 250,
    is_active: true
  },
  {
    id: '4',
    name: 'Oncology Consultation',
    description: 'Cancer screening and specialized oncology consultation',
    duration_minutes: 60,
    price: 300,
    is_active: true
  },
  {
    id: '5',
    name: 'Laboratory Services',
    description: 'Complete blood work and diagnostic laboratory tests',
    duration_minutes: 15,
    price: 50,
    is_active: true
  },
  {
    id: '6',
    name: 'Ophthalmology Consultation',
    description: 'Eye examination and vision assessment',
    duration_minutes: 30,
    price: 150,
    is_active: true
  },
  {
    id: '7',
    name: 'Pediatrics Consultation',
    description: 'Specialized medical care for children and adolescents',
    duration_minutes: 30,
    price: 120,
    is_active: true
  },
  {
    id: '8',
    name: 'Orthopedics Consultation',
    description: 'Bone, joint, and musculoskeletal system examination',
    duration_minutes: 45,
    price: 180,
    is_active: true
  }
];

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockServices;
    },
  });
};
