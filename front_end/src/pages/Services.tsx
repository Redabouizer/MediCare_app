
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Syringe, FlaskConical, Eye, Brain, Baby, Bone } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "General Medical Consultations",
      description: "Comprehensive primary care services with experienced physicians for routine check-ups, preventive care, and general health concerns."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiology",
      description: "Advanced cardiac care including interventional cardiology, heart disease prevention, and comprehensive cardiovascular treatments."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neurology",
      description: "Specialized neurological care for brain, spine, and nervous system disorders with cutting-edge diagnostic and treatment options."
    },
    {
      icon: <Syringe className="w-8 h-8" />,
      title: "Oncology",
      description: "Comprehensive cancer care with the latest treatment protocols, chemotherapy, radiation therapy, and supportive care services."
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Laboratory Services",
      description: "State-of-the-art diagnostic laboratory services with accurate and timely results for all types of medical tests."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Ophthalmology",
      description: "Complete eye care services including vision correction, cataract surgery, glaucoma treatment, and retinal care."
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents with child-friendly environment and expert pediatric care."
    },
    {
      icon: <Bone className="w-8 h-8" />,
      title: "Orthopedics",
      description: "Advanced orthopedic care for bone, joint, and muscle conditions including sports medicine and joint replacement."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6">Our Services</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At MediCare, we offer a comprehensive range of medical services designed to meet all your healthcare needs. 
            Our team of experienced specialists is dedicated to providing the highest quality care with the latest medical technologies.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <div className="text-blue-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <Link to="/appointment">
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-600 text-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Emergency Services</h2>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Our emergency department is open 24/7 to provide immediate medical care when you need it most. 
              Don't hesitate to seek help in case of medical emergencies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-2xl font-bold">Emergency Hotline: +212661514131</div>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-600 rounded-full"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Ready to Schedule Your Appointment?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health. Our medical professionals are here to provide you with 
            personalized care and treatment plans tailored to your specific needs.
          </p>
          <Link to="/appointment">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
              Make an Appointment
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
