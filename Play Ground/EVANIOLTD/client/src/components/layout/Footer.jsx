import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Github,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Wallet,
  Building2,
  Sparkles,
  Award,
  Shield,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { BrandLogoSlider } from '../BrandLogoSlider';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();
  const logoImage = theme?.logoImage || '/logo.png'; // Default logo image path
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/www.Hasibur.me/', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/hasibur.me/', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/x_hasibur', color: 'hover:text-blue-300' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hasibur-me/', color: 'hover:text-blue-500' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@hasibur_me', color: 'hover:text-red-400' },
    { name: 'GitHub', icon: Github, url: '#', color: 'hover:text-gray-300' },
  ];

  const paymentMethods = [
    { name: 'Cards', icon: '💳' },
    { name: 'PayPal', icon: '💳' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Bank Transfer', icon: '🏦' },
  ];

  return (
    <>
      <BrandLogoSlider />
      <footer className="relative bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-xl border-t border-white/20 mt-20 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Header Section */}
        <div className="text-center mb-12 pb-8 border-b border-white/20">
          <Link 
            to="/" 
            className="inline-block hover:opacity-90 transition-opacity mb-4"
          >
            <img 
              src={logoImage} 
              alt="Evanio Logo" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain mx-auto"
            />
          </Link>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your trusted partner for complete business solutions. Launch, grow, and succeed with Evanio.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90">500+ Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/90">Trusted & Secure</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Growing Fast</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Our Team</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Portfolio</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/service/business-formation" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Business Formation</span>
                </Link>
              </li>
              <li>
                <Link to="/service/website-development" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Website Development</span>
                </Link>
              </li>
              <li>
                <Link to="/service/logo-branding" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Logo & Branding</span>
                </Link>
              </li>
              <li>
                <Link to="/service/payment-gateway-setup" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Payment Setup</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>View All Services</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Documentation</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Contact Support</span>
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Testimonials</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-white/70 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  <span>Reviews</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-pink-400" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="group">
                <a 
                  href="mailto:hello@evanio.com" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 group-hover:border-blue-400/70 transition-all">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Email</div>
                    <div className="font-medium">hello@evanio.com</div>
                  </div>
                </a>
              </li>
              <li className="group">
                <a 
                  href="tel:+8801800000800" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-10 h-10 bg-green-500/20 border border-green-400/50 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 group-hover:border-green-400/70 transition-all">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Phone</div>
                    <div className="font-medium">+880 1800 000 800</div>
                  </div>
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-start gap-3 p-2 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/20 border border-purple-400/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Location</div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      499 Hamchayapur Road<br />
                      Sherpur, Bogura 5840<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Payment Methods Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Follow Us Section */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-center md:text-left flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Follow Us
              </h4>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 rounded-xl text-white/70 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>
                    </a>
                  );
                })}
              </div>
              <p className="text-white/60 text-sm mt-4 text-center md:text-left">
                Stay connected with us on social media
              </p>
            </div>

            {/* Payment Methods Section */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-center md:text-left flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-400" />
                Accepted Payment Methods
              </h4>
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="group relative px-4 py-3 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/40 rounded-xl text-white/70 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
                    title={method.name}
                  >
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-semibold hidden sm:inline">{method.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-blue-500/0 group-hover:from-green-500/20 group-hover:to-blue-500/20 rounded-xl transition-all duration-300"></div>
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm mt-4 text-center md:text-left">
                Secure and trusted payment options
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/80 text-sm font-medium">
              &copy; 2025 <span className="font-bold text-white">Evanio</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/refund-policy" 
                className="text-white/70 hover:text-white transition-all duration-300 hover:underline flex items-center gap-1"
              >
                Refund Policy
              </Link>
              <span className="text-white/40">•</span>
              <Link 
                to="/privacy-policy" 
                className="text-white/70 hover:text-white transition-all duration-300 hover:underline flex items-center gap-1"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40">•</span>
              <Link 
                to="/terms" 
                className="text-white/70 hover:text-white transition-all duration-300 hover:underline flex items-center gap-1"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};


