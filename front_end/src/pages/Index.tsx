import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, Building, FlaskConical, Award, FileText, Zap, Gift, Fingerprint, ArrowRight, CheckCircle, Heart, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-1000"></div>

        <div className="absolute top-4 right-4 text-xs text-slate-600 flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <span className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer">
            <span>📧</span>
            <span>MediCare@gmail.com</span>
          </span>
          <span className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer">
            <span>📞</span>
            <span>+212661514131</span>
          </span>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg animate-pulse">
                <Heart className="w-4 h-4 mr-2" />
                Trusted Healthcare Partner
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-6 leading-tight">
                WELCOME TO
                <span className="block text-6xl md:text-7xl">MEDICARE</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                We are the MediCare Group, dedicated to providing quality medical services and promoting the 
                well-being of our patients throughout the kingdom
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/appointment">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 hover:shadow-xl group">
                    GET STARTED
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl border border-white/50">
                <div className="text-8xl animate-bounce">🩺</div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Why Choose MediCare - Enhanced */}
            <div className="lg:col-span-1 group">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white p-8 rounded-3xl h-full shadow-2xl transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 mr-3" />
                    <h2 className="text-2xl font-bold">Why Choose MediCare?</h2>
                  </div>
                  
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    MediCare is your ideal choice for quality healthcare, patient-centered approach, and a comprehensive range 
                    of medical services. With our trusted reputation and accessibility, we are your reliable partner for dependable 
                    and personalized healthcare.
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-full group-hover:shadow-lg transition-all"
                  >
                    Learn More →
                  </Button>
                </div>
              </div>
            </div>

            {/* Excellence Card */}
            <div className="group">
              <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-700 mb-4 group-hover:text-blue-600 transition-colors">EXCELLENCE</h3>
                <p className="text-gray-600 leading-relaxed">
                  At MediCare, excellence is reflected in an unwavering pursuit of optimal quality of care, 
                  through cutting-edge medical practices and unparalleled patient service.
                </p>
                
                <div className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Learn More
                </div>
              </div>
            </div>

            {/* Engagement Card */}
            <div className="group">
              <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-700 mb-4 group-hover:text-green-600 transition-colors">ENGAGEMENT</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our commitment is the promise of unwavering dedication to our patients, our employees, and our 
                  community, ensuring responsible and accessible healthcare.
                </p>
                
                <div className="mt-6 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Learn More
                </div>
              </div>
            </div>

            {/* Innovation Card */}
            <div className="group">
              <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-700 mb-4 group-hover:text-purple-600 transition-colors">INNOVATION</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nurturing creativity and fostering experimentation is fundamental to identifying and 
                  adopting the most effective solutions, thereby enhancing our care and deepening our 
                  relationships with patients and partners.
                </p>
                
                <div className="mt-6 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <div className="text-8xl z-10 animate-bounce">👨‍⚕️</div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform group">
                    <div className="w-0 h-0 border-l-8 border-r-0 border-b-6 border-t-6 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                  </div>
                </div>
                
                {/* Floating Medical Icons */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse delay-500">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  About Our Mission
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-6">MediCare Excellence</h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  MediCare aims to create a high-quality healthcare network accessible to all Moroccans, offering specialized 
                  medical services like interventional cardiology, intensive care, and oncology. Our goal is to improve accessibility, 
                  maximize recovery chances, and enhance overall well-being.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Fingerprint,
                    title: "Secure Authentication",
                    description: "Protect sensitive patient information with a secure fingerprint authentication system.",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: Gift,
                    title: "Seamless Patient Experience",
                    description: "Provide your patients with a seamless and pleasant experience through innovative practice management solutions.",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: Zap,
                    title: "Advanced Healthcare Technologies",
                    description: "Embrace cutting-edge technologies to enhance the efficiency, accuracy, and quality of care provided to your patients.",
                    color: "from-green-500 to-emerald-500"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-slate-700 mb-2">85</div>
              <div className="text-gray-600">Doctors</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-slate-700 mb-2">18</div>
              <div className="text-gray-600">Departments</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-slate-700 mb-2">12</div>
              <div className="text-gray-600">Research Labs</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-slate-700 mb-2">150</div>
              <div className="text-gray-600">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Preview with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            Get In Touch
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
          
          <p className="text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed text-lg">
            Feel free to contact us for any inquiries, appointment scheduling, or additional information. Our team is here to address your healthcare needs and 
            provide you with the best care possible. Fill out the contact form below or use our contact details to reach us directly. We look forward to hearing from you!
          </p>
          
          <Link to="/contact">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:scale-105 transition-all group">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
