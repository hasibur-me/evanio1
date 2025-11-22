import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import api from '../utils/api';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Video,
  MessageCircle,
  Zap
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'consultation', label: 'Free Consultation', icon: Video },
    { value: 'support', label: 'Technical Support', icon: MessageCircle },
    { value: 'sales', label: 'Sales Question', icon: Zap },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@evanio.com',
      link: 'mailto:hello@evanio.com',
      description: 'Send us an email anytime',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+880 1800 000 800',
      link: 'tel:+8801800000800',
      description: 'Mon-Fri, 9 AM - 6 PM',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: '499 Hamchayapur Road, Sherpur, Bogura 5840',
      link: '#',
      description: 'Bangladesh',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      value: 'Book a meeting',
      link: '/service/business-consultancy',
      description: 'Free consultation session',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50'
    },
  ];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Always save to Contact collection first (for admin dashboard)
      const contactResponse = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || `Contact Form - ${formData.inquiryType}`,
        message: formData.message,
        service: formData.inquiryType,
        source: 'contact_form',
      });

      console.log('Contact form submitted successfully:', contactResponse.data);

      // If user is logged in, also create a ticket
      if (user) {
        try {
          await api.post('/tickets', {
            subject: formData.subject || `Contact Form - ${formData.inquiryType}`,
            message: `Inquiry Type: ${formData.inquiryType}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`,
            type: formData.inquiryType === 'support' ? 'technical' : 'inquiry'
          });
        } catch (ticketError) {
          console.error('Error creating ticket (contact still saved):', ticketError);
          // Don't fail the whole submission if ticket creation fails
        }
      }

      setSubmitSuccess(true);
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });

      // Redirect logged-in users to dashboard tickets after 2 seconds
      if (user) {
        setTimeout(() => {
          navigate('/dashboard/tickets');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit contact form. Please try again or email us at info@evanio.com';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Contact Us - Evanio | Get in Touch</title>
        <meta name="description" content="Have a question or need help? Contact Evanio. We're here to assist you with all your business needs." />
      </Helmet>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Have a question or need help? We're here to assist you. Choose your preferred method to reach us.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const isLink = method.link.startsWith('http') || method.link.startsWith('/') || method.link.startsWith('mailto') || method.link.startsWith('tel');
              
              return (
                <Card
                  key={index}
                  glass
                  className={`p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer ${method.bgColor} border-2 ${method.borderColor}`}
                  onClick={() => {
                    if (isLink && !method.link.startsWith('/')) {
                      window.open(method.link, '_blank');
                    } else if (method.link.startsWith('/')) {
                      navigate(method.link);
                    }
                  }}
                >
                  <div className={`w-16 h-16 ${method.bgColor} ${method.borderColor} border-2 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-white/90 font-medium mb-1">{method.value}</p>
                  <p className="text-sm text-white/70">{method.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              <GlassCard variant="service" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:hello@evanio.com" className="text-white/80 hover:text-white transition-colors">
                      hello@evanio.com
                    </a>
                    <p className="text-sm text-white/60 mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="service" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                    <a href="tel:+8801800000800" className="text-white/80 hover:text-white transition-colors">
                      +880 1800 000 800
                    </a>
                    <p className="text-sm text-white/60 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Mon-Fri, 9 AM - 6 PM
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="service" className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                    <p className="text-white/80">
                      499 Hamchayapur Road<br />
                      Sherpur, Bogura 5840<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </GlassCard>

              {!user && (
                <GlassCard variant="service" className="p-6 bg-blue-500/20 border-blue-400/30">
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Need Account Access?</h3>
                      <p className="text-white/80 mb-4 text-sm">
                        Create an account to track your inquiries and access additional features.
                      </p>
                      <div className="flex space-x-3">
                        <Link to="/register">
                          <Button
                            size="sm"
                            className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90"
                          >
                            Sign Up
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button
                            variant="outline"
                            size="sm"
                            className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
                          >
                            Login
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard variant="cta" className="p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                <p className="text-white/70 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-lg backdrop-blur-sm bg-green-500/20 border border-green-400/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-200 font-medium">
                          ✓ Message sent successfully! We'll get back to you soon.
                        </p>
                        {user && <p className="text-sm text-green-300/80 mt-1">Redirecting to your tickets...</p>}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Inquiry Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {inquiryTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type.value })}
                            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                              formData.inquiryType === type.value
                                ? 'bg-blue-600/30 border-blue-400/50 text-white'
                                : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            <Icon className="w-5 h-5 mx-auto mb-2" />
                            <div className="text-xs font-medium">{type.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                        Full Name *
                      </label>
                      <Input
                        glass
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                        Email *
                      </label>
                      <Input
                        glass
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      Phone Number (Optional)
                    </label>
                    <Input
                      glass
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                      Subject *
                    </label>
                    <Input
                      glass
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                      Message *
                    </label>
                    <Textarea
                      glass
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help you..."
                    />
                    <p className="text-xs text-white/60 mt-2">{formData.message.length}/1000 characters</p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}
