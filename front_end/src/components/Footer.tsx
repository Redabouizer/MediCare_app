
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">MediCare</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Younes Larhrib<br />
              123 maarif Street<br />
              Casablanca, 20000<br />
              Morocco
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>+212661514131</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>MediCare@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Useful Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                About us
              </Link>
              <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link to="/doctors" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Doctors
              </Link>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Our Services</h3>
            <div className="space-y-2">
              <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                General Medical Consultations
              </Link>
              <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Specialized Consultations
              </Link>
              <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Vaccinations
              </Link>
              <Link to="/services" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Laboratory Examinations
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © Copyright <strong>MediCare</strong>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
