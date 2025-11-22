import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { 
  Phone, 
  MessageCircle, 
  Video, 
  Check, 
  ArrowRight, 
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Target,
  BarChart3,
  Lightbulb,
  Globe,
  CheckCircle2,
  Play,
  Quote
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function BusinessConsultancy() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    method: '',
    preferredDate: '',
    preferredTime: '',
    businessType: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const consultationMethods = [
    {
      icon: Phone,
      title: 'Phone Consultation',
      description: 'Get instant expert guidance over the phone',
      duration: '15-30 min',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      value: 'phone'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Consultation',
      description: 'Fast & easy — perfect for quick questions',
      duration: '10-20 min',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      value: 'whatsapp'
    },
    {
      icon: Video,
      title: 'Video Call Session',
      description: 'For comprehensive strategy sessions',
      duration: '30-60 min',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
      value: 'video'
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Strategic Business Planning',
      description: 'Get expert guidance on how to start, register, or scale your business effectively with a customized roadmap.',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'LLC / LTD Setup Support',
      description: 'Find out which structure is best for you, based on goals, budget, and country-specific requirements.',
      color: 'text-green-400'
    },
    {
      icon: Lightbulb,
      title: 'Branding & Online Presence',
      description: 'We guide you on how your brand should look, feel, and communicate to attract your ideal customers.',
      color: 'text-yellow-400'
    },
    {
      icon: Globe,
      title: 'Payment Gateway & Banking',
      description: 'Learn exactly how to get Stripe, PayPal, Wise, or a business bank account set up for your business.',
      color: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      title: 'Growth & Marketing Blueprint',
      description: 'Get a simple, actionable plan tailored to your business needs and target market.',
      color: 'text-pink-400'
    },
    {
      icon: Zap,
      title: 'AI & Automation Strategy',
      description: "We'll help you use AI tools to increase speed, save time, and scale efficiently.",
      color: 'text-orange-400'
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Businesses Consulted', icon: Users },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
    { number: '24/7', label: 'Available Support', icon: Clock },
    { number: '100%', label: 'Free Consultations', icon: Award },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      company: 'Tech Innovations Inc.',
      image: '👩‍💼',
      rating: 5,
      text: 'The free consultation helped me understand exactly what I needed to do. The expert guidance was invaluable and completely free!',
      method: 'Video Call'
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      company: 'Global Solutions',
      image: '👨‍💻',
      rating: 5,
      text: 'Got clarity on my business structure in just 15 minutes. The WhatsApp consultation was so convenient and helpful.',
      method: 'WhatsApp'
    },
    {
      name: 'Emily Davis',
      role: 'Business Owner',
      company: 'Creative Agency',
      image: '👩‍🎨',
      rating: 5,
      text: 'The strategic planning session gave me a clear roadmap. I knew exactly what steps to take next. Highly recommend!',
      method: 'Phone'
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choose Your Method',
      description: 'Select Phone, WhatsApp, or Video Call based on your preference.',
      icon: Phone
    },
    {
      step: '2',
      title: 'Book Your Session',
      description: 'Fill out a quick form or contact us directly. No payment required.',
      icon: Calendar
    },
    {
      step: '3',
      title: 'Get Expert Advice',
      description: 'Receive personalized, one-on-one guidance from our business experts.',
      icon: Users
    },
    {
      step: '4',
      title: 'Take Action',
      description: 'Implement the strategies and start building your business with confidence.',
      icon: CheckCircle2
    },
  ];

  const faqs = [
    {
      question: 'Is this really 100% free?',
      answer: 'Yes — absolutely free. No commitments, no hidden charges, no credit card required. We believe in providing value first and building trust through our free consultations.',
    },
    {
      question: 'How long are consultancy sessions?',
      answer: 'Session duration varies by method: Phone consultations are typically 15-30 minutes, WhatsApp consultations are 10-20 minutes, and Video Call sessions can be 30-60 minutes for comprehensive strategy discussions.',
    },
    {
      question: 'Can I get help with company setup and payments?',
      answer: 'Absolutely! We guide you step-by-step through business formation, LLC/LTD setup, payment gateway integration (Stripe, PayPal, Wise), and business bank account opening. Our experts have extensive experience in these areas.',
    },
    {
      question: 'What if I need ongoing support?',
      answer: 'After your free consultation, if you need ongoing support, we offer paid consultancy packages. However, the initial consultation is always free with no obligation to purchase anything.',
    },
    {
      question: 'How quickly can I get a consultation?',
      answer: 'We typically respond within 24 hours to schedule your consultation. For urgent matters, we offer same-day consultations when available.',
    },
    {
      question: 'Do you provide industry-specific advice?',
      answer: 'Yes! Our consultants have experience across various industries including tech, e-commerce, services, manufacturing, and more. We tailor our advice to your specific industry and business model.',
    },
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setFormData({ ...formData, method: method.value });
    setShowBookingForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Submit consultation request
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Business Consultancy Request - ${formData.method}`,
        message: `Consultation Method: ${formData.method}\nPreferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\nBusiness Type: ${formData.businessType}\n\nMessage: ${formData.message}`
      });

      setSubmitted(true);
      setTimeout(() => {
        setShowBookingForm(false);
        setSubmitted(false);
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: '',
          method: '',
          preferredDate: '',
          preferredTime: '',
          businessType: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      alert('Error submitting request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Business Consultancy (FREE Service) - Evanio</title>
        <meta name="description" content="Get 100% free business consultancy via Phone, WhatsApp, or Video Call. Expert guidance for entrepreneurs, startups, and global founders." />
        <meta name="keywords" content="free business consultancy, business advice, startup consultation, free consultation" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">100% Free - No Credit Card Required</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Business Consultancy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Completely Free
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              Get expert business guidance from industry professionals. Choose your preferred method and get instant, personalized advice.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card glass key={index} className="p-4 md:p-6 text-center">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm md:text-base text-white/70">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Consultation Methods */}
          <GlassCard variant="hero" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Choose Your Consultation Method
            </h2>
            <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
              All methods are completely free. Select the one that works best for you.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {consultationMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={index}
                    glass
                    className={`p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${method.borderColor} ${method.bgColor} ${selectedMethod?.value === method.value ? 'ring-4 ring-blue-400/50' : ''}`}
                    onClick={() => handleMethodSelect(method)}
                  >
                    <div className={`w-20 h-20 ${method.bgColor} ${method.borderColor} border-2 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`w-10 h-10 ${method.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{method.title}</h3>
                    <p className="text-white/80 mb-4">{method.description}</p>
                    <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{method.duration}</span>
                    </div>
                    <Button
                      className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white border border-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMethodSelect(method);
                      }}
                    >
                      Book Now
                    </Button>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Booking Form Modal */}
          {showBookingForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Book Your {selectedMethod?.title}
                  </h3>
                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      setSubmitted(false);
                    }}
                    className="text-white/70 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">Request Submitted!</h4>
                    <p className="text-white/80 mb-6">
                      We'll contact you within 24 hours to schedule your consultation.
                    </p>
                    <Button
                      onClick={() => {
                        setShowBookingForm(false);
                        setSubmitted(false);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Name *</label>
                        <Input
                          glass
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Email *</label>
                        <Input
                          glass
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Phone *</label>
                        <Input
                          glass
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Business Type</label>
                        <select
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select business type</option>
                          <option value="startup">Startup</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="saas">SaaS</option>
                          <option value="service">Service Business</option>
                          <option value="retail">Retail</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Preferred Date</label>
                        <Input
                          glass
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Preferred Time</label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select time</option>
                          <option value="morning">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                          <option value="evening">Evening (5 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Tell us about your business or questions *</label>
                      <Textarea
                        glass
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Describe your business, goals, or specific questions you'd like to discuss..."
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {submitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowBookingForm(false);
                          setSubmitted(false);
                        }}
                        className="px-6 bg-white/10 hover:bg-white/20 text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          )}

          {/* What You'll Get Section */}
          <GlassCard variant="cta" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What You'll Get (Free of Cost)
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Comprehensive business guidance covering all aspects of starting and growing your business
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${benefit.color.replace('text-', 'bg-')}/20 border-2 ${benefit.color.replace('text-', 'border-')}/50 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                        <p className="text-white/80 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card glass key={index} className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                  <p className="text-white/90 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/70">{testimonial.role}</div>
                      <div className="text-xs text-white/60 mt-1">via {testimonial.method}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white/30 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-xl font-bold text-white">{step.step}</span>
                    </div>
                    <Card glass className="p-6 h-full pt-8">
                      <Icon className="w-8 h-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-white/80">{step.description}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Why Free Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why We Offer Free Consultations
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                We believe every entrepreneur deserves access to expert business guidance, regardless of their current stage or budget.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Target, text: 'Clear Direction', color: 'text-blue-400' },
                { icon: Shield, text: 'Honest Guidance', color: 'text-green-400' },
                { icon: Lightbulb, text: 'Expert Advice', color: 'text-yellow-400' },
                { icon: BarChart3, text: 'Transparency', color: 'text-purple-400' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card glass key={index} className="p-6 text-center">
                    <Icon className={`w-10 h-10 ${item.color} mx-auto mb-3`} />
                    <p className="text-lg font-semibold text-white">{item.text}</p>
                  </Card>
                );
              })}
            </div>
            <p className="text-center text-white/90 mt-8 max-w-3xl mx-auto">
              Our success comes from helping you succeed — even before you become a client. We build trust through value, not sales pitches.
            </p>
          </GlassCard>

          {/* FAQ Section with Accordion */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card glass key={index} className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-white pr-4">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-white/70 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white/70 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </GlassCard>

          {/* Final CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Expert Business Guidance?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Book your free consultation today. No credit card required, no commitments, just expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setSelectedMethod(consultationMethods[0]);
                  handleMethodSelect(consultationMethods[0]);
                }}
                size="lg"
                className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-medium bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Contact Us Directly
                </Button>
              </Link>
            </div>
            <p className="text-white/70 mt-6 text-sm">
              We typically respond within 24 hours • Same-day consultations available
            </p>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}
