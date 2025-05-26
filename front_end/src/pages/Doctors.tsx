
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Clock } from 'lucide-react';

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. Ahmed Hassan",
      specialty: "Cardiologist",
      education: "MD from University of Casablanca",
      experience: "15+ years",
      description: "Specialized in interventional cardiology and heart disease prevention. Expert in cardiac catheterization and stent placement.",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Fatima El Mansouri",
      specialty: "Neurologist",
      education: "MD, PhD in Neuroscience",
      experience: "12+ years",
      description: "Leading expert in neurological disorders, stroke treatment, and brain surgery. Published researcher in neuroscience.",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Mohammed Alami",
      specialty: "General Practitioner",
      education: "MD from Mohammed V University",
      experience: "20+ years",
      description: "Comprehensive primary care physician with expertise in preventive medicine and family healthcare.",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Aicha Benali",
      specialty: "Pediatrician",
      education: "MD in Pediatrics",
      experience: "10+ years",
      description: "Dedicated to children's health with special focus on developmental disorders and pediatric immunology.",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Youssef Tazi",
      specialty: "Orthopedic Surgeon",
      education: "MD, Fellowship in Joint Replacement",
      experience: "18+ years",
      description: "Expert in joint replacement surgery, sports medicine, and trauma care. Minimally invasive surgery specialist.",
      image: "👨‍⚕️"
    },
    {
      name: "Dr. Laila Ouali",
      specialty: "Ophthalmologist",
      education: "MD in Ophthalmology",
      experience: "14+ years",
      description: "Specialized in cataract surgery, glaucoma treatment, and retinal diseases. Latest laser surgery techniques.",
      image: "👩‍⚕️"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6">Our Medical Team</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our team of highly qualified and experienced medical professionals who are dedicated to providing 
            exceptional healthcare services with compassion and expertise.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    {doctor.image}
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{doctor.education}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{doctor.experience} of experience</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {doctor.description}
                </p>

                <Link to="/appointment">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-700 mb-4">Why Choose Our Doctors?</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Highly Qualified</h3>
              <p className="text-gray-600">
                All our doctors are board-certified with advanced degrees from prestigious medical schools and ongoing continuing education.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Award Winning</h3>
              <p className="text-gray-600">
                Our medical team has received numerous awards and recognition for excellence in patient care and medical innovation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Experienced</h3>
              <p className="text-gray-600">
                With decades of combined experience, our doctors have successfully treated thousands of patients with various conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
