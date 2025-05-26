
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Award, Users, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6">About MediCare</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated to providing exceptional healthcare services and promoting the well-being of our patients 
            throughout Morocco with cutting-edge medical technology and compassionate care.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-700 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                MediCare aims to create a high-quality healthcare network accessible to all Moroccans, offering specialized 
                medical services like interventional cardiology, intensive care, and oncology. Our goal is to improve accessibility, 
                maximize recovery chances, and enhance overall well-being.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to excellence in healthcare delivery, ensuring that every patient receives personalized, 
                compassionate care with the most advanced medical technologies available.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-8xl">🏥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-700 mb-4">Our Core Values</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Compassion</h3>
              <p className="text-gray-600">
                We treat every patient with empathy, understanding, and genuine care for their well-being.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in medical care and continuously improve our services.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest ethical standards and build trust through honest, transparent practices.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We work together as a team to provide comprehensive, coordinated care for our patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-700 mb-4">Our Journey</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-8xl">📈</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-700 mb-6">Building Healthcare Excellence</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Foundation</h4>
                    <p className="text-gray-600">Established with a vision to provide accessible, high-quality healthcare to all Moroccans.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Expansion</h4>
                    <p className="text-gray-600">Grew to include specialized departments and advanced medical technologies.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Innovation</h4>
                    <p className="text-gray-600">Continuously adopting cutting-edge medical technologies and treatment methods.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Future</h4>
                    <p className="text-gray-600">Committed to expanding our reach and improving healthcare outcomes for all patients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
