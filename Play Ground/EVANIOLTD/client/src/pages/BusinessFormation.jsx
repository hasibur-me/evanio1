import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Building2, 
  Check, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Video, 
  FileText, 
  CreditCard, 
  Globe, 
  ShieldCheck,
  Rocket,
  TrendingUp,
  Briefcase,
  Code,
  User,
  Users,
  ShoppingBag,
  Sparkles,
  Star,
  Clock,
  Award,
  Zap,
  CheckCircle2,
  DollarSign,
  Quote,
  BarChart3
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BusinessFormation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usa');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const stats = [
    { number: '5,000+', label: 'Companies Formed', icon: Building2, color: 'text-blue-400' },
    { number: '99.8%', label: 'Success Rate', icon: Award, color: 'text-green-400' },
    { number: '3-5 Days', label: 'Average Processing', icon: Clock, color: 'text-purple-400' },
    { number: '24/7', label: 'Support Available', icon: Zap, color: 'text-yellow-400' },
  ];

  const usaPackages = [
    {
      name: 'Starter',
      price: 299,
      originalPrice: 399,
      popular: false,
      duration: '7-10 business days',
      features: [
        'Basic LLC Formation',
        'EIN Application',
        'Articles of Organization',
        'Registered Agent (1 year)',
        'Digital Document Delivery',
        'Email Support',
        'Business Name Availability Check',
      ],
    },
    {
      name: 'Professional',
      price: 599,
      originalPrice: 799,
      popular: true,
      duration: '3-5 business days',
      features: [
        'Everything in Starter',
        'Operating Agreement',
        'Expedited Processing (3-5 days)',
        'Business Name Reservation',
        'Compliance Alerts',
        'Priority Email & Phone Support',
        'Tax ID Setup Assistance',
        'Bank Account Setup Guidance',
        'Payment Gateway Preparation',
      ],
    },
    {
      name: 'Enterprise',
      price: 999,
      originalPrice: 1299,
      popular: false,
      duration: '1-3 business days',
      features: [
        'Everything in Professional',
        'Multi-State Registration',
        'Custom Operating Agreement',
        'Annual Compliance Review',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        'Bank Account Setup Guidance',
        'Payment Gateway Integration Help',
        'Business Credit Building Support',
        'Ongoing Compliance Monitoring',
      ],
    },
  ];

  const ukPackages = [
    {
      name: 'Starter',
      price: 249,
      originalPrice: 349,
      popular: false,
      duration: '5-7 business days',
      features: [
        'Basic LTD Formation',
        'Companies House Registration',
        'Certificate of Incorporation',
        'Registered Office Address (1 year)',
        'Digital Document Delivery',
        'Email Support',
        'Company Name Availability Check',
      ],
    },
    {
      name: 'Professional',
      price: 499,
      originalPrice: 699,
      popular: true,
      duration: '2-3 business days',
      features: [
        'Everything in Starter',
        'Memorandum & Articles of Association',
        'Expedited Processing (2-3 days)',
        'Company Name Reservation',
        'Compliance Alerts',
        'Priority Email & Phone Support',
        'VAT Registration Assistance',
        'UK Bank Account Setup Guidance',
        'Payment Gateway Preparation',
      ],
    },
    {
      name: 'Enterprise',
      price: 899,
      originalPrice: 1199,
      popular: false,
      duration: '1-2 business days',
      features: [
        'Everything in Professional',
        'Multi-Company Registration',
        'Custom Articles of Association',
        'Annual Compliance Review',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        'UK Bank Account Setup Guidance',
        'Payment Gateway Integration Help',
        'Business Credit Building Support',
        'Ongoing Compliance Monitoring',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'E-commerce Founder',
      company: 'TechStart Inc.',
      image: '👩‍💼',
      rating: 5,
      text: 'Evanio made forming my LLC incredibly smooth. The Professional package was perfect, and I had my company registered in just 4 days!',
      package: 'Professional',
    },
    {
      name: 'Michael Chen',
      role: 'SaaS Founder',
      company: 'Global Solutions',
      image: '👨‍💻',
      rating: 5,
      text: 'As an international founder, I was worried about the complexity. Evanio handled everything perfectly. Highly recommend!',
      package: 'Enterprise',
    },
    {
      name: 'Emily Davis',
      role: 'Freelancer',
      company: 'Creative Agency',
      image: '👩‍🎨',
      rating: 5,
      text: 'The Starter package was exactly what I needed. Fast, affordable, and the support team answered all my questions.',
      package: 'Starter',
    },
  ];

  const whyChoose = [
    {
      icon: Rocket,
      title: 'End-to-End Company Setup',
      description: 'From choosing the right structure to submitting documents, we manage the entire formation process for you.',
      color: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      title: 'Fast & Hassle-Free Registration',
      description: 'Get your company formed within the shortest possible time — without mistakes or delays.',
      color: 'text-green-400'
    },
    {
      icon: FileText,
      title: 'Full Compliance & Documentation',
      description: 'We ensure all legal requirements, filings, and compliance steps are handled with precision.',
      color: 'text-purple-400'
    },
    {
      icon: Globe,
      title: 'Global Founders Supported',
      description: 'No matter where you live, we help you register your company in the most business-friendly locations.',
      color: 'text-pink-400'
    },
    {
      icon: Phone,
      title: 'Free Consultancy Included',
      description: 'Need help deciding between LLC, LTD, S-Corp, or something else? We provide free phone, WhatsApp, or video call consultation.',
      color: 'text-yellow-400'
    },
    {
      icon: ShieldCheck,
      title: 'Ongoing Support & Guidance',
      description: 'We don\'t just form your company — we provide ongoing support for compliance, taxes, and business growth.',
      color: 'text-orange-400'
    },
  ];

  const whatsIncluded = [
    {
      number: '1',
      title: 'Business Structure Selection',
      description: 'LLC, LTD, Sole Prop, Corporation — we identify what fits your goals.',
      icon: Building2,
    },
    {
      number: '2',
      title: 'Company Name Availability Check',
      description: 'We help you choose a legally valid and professional name.',
      icon: FileText,
    },
    {
      number: '3',
      title: 'Registration & Filing',
      description: 'All official paperwork handled for you.',
      icon: Check,
    },
    {
      number: '4',
      title: 'EIN / Tax ID Setup',
      description: 'Essential for taxes, payments, and banking.',
      icon: CreditCard,
    },
    {
      number: '5',
      title: 'Operating Agreement / Articles',
      description: 'Professional documents created for you.',
      icon: FileText,
    },
    {
      number: '6',
      title: 'Business Address / Mail Handling',
      description: '(Optional) Virtual address solutions for international entrepreneurs.',
      icon: Globe,
    },
    {
      number: '7',
      title: 'Payment Gateway Preparation',
      description: 'We set you up for Stripe, PayPal, Wise, and more.',
      icon: CreditCard,
    },
    {
      number: '8',
      title: 'Bank Account Opening Assistance',
      description: 'Guidance and documentation support for opening a business bank account.',
      icon: Building2,
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Free Consultation (Optional)',
      description: 'Phone, WhatsApp, or Video Call.',
      icon: Phone,
    },
    {
      step: '2',
      title: 'Choose Your Package',
      description: 'Select the perfect plan for your needs.',
      icon: Briefcase,
    },
    {
      step: '3',
      title: 'Purchase & Submit Information',
      description: 'Secure checkout and simple form.',
      icon: CreditCard,
    },
    {
      step: '4',
      title: 'We Complete The Registration',
      description: 'You relax while we handle the entire setup.',
      icon: Check,
    },
    {
      step: '5',
      title: 'Receive All Documents Digitally',
      description: 'Formation documents, EIN, compliance files — everything delivered securely.',
      icon: FileText,
    },
    {
      step: '6',
      title: 'Start Operating Your New Business',
      description: 'Get ready to launch, accept payments, and grow.',
      icon: Rocket,
    },
  ];

  const industries = [
    { name: 'E-commerce', icon: ShoppingBag },
    { name: 'Software / SaaS', icon: Code },
    { name: 'Freelancers', icon: User },
    { name: 'Agencies', icon: Users },
    { name: 'Startups', icon: Rocket },
    { name: 'International founders', icon: Globe },
    { name: 'Dropshippers', icon: TrendingUp },
    { name: 'Creators', icon: Sparkles },
  ];

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    const serviceType = activeTab === 'usa' ? 'USA LLC' : 'UK LTD';
    const checkoutUrl = `/checkout?service=Business Formation&serviceSlug=business-formation&package=${pkg.name}&packagePrice=${pkg.price}&type=${serviceType}`;
    navigate(checkoutUrl);
  };

  const currentPackages = activeTab === 'usa' ? usaPackages : ukPackages;

  return (
    <GlassBackground>
      <Helmet>
        <title>Business Formation Services - Evanio | Register Your Company</title>
        <meta name="description" content="Launch your company anywhere in the world with ease, speed, and full compliance. Register your company with confidence — fast, compliant, and stress-free." />
        <meta name="keywords" content="business formation, company registration, LLC, LTD, company setup, business incorporation" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">5,000+ Companies Formed Successfully</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Business Formation Services
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Register Your Company Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              Launch your company anywhere in the world with ease, speed, and full compliance. Fast, affordable, and stress-free.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card glass key={index} className="p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm md:text-base text-white/70">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Packages Section - Premium Design */}
          <GlassCard variant="hero" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Choose Your Package
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Select the perfect package for your business formation needs. All packages include full compliance and expert support.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex backdrop-blur-sm bg-white/10 border border-white/20 rounded-full p-1">
                <button
                  onClick={() => setActiveTab('usa')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'usa'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🇺🇸 USA LLC
                </button>
                <button
                  onClick={() => setActiveTab('uk')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'uk'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🇬🇧 UK LTD
                </button>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {currentPackages.map((pkg, index) => (
                <Card
                  key={index}
                  glass
                  className={`p-6 md:p-8 relative flex flex-col transition-all duration-300 hover:scale-105 ${
                    pkg.popular
                      ? 'border-2 border-yellow-400/50 bg-gradient-to-br from-yellow-500/10 to-blue-500/10 ring-4 ring-yellow-400/20'
                      : 'border border-white/20'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        ${pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-2xl text-white/50 line-through">${pkg.originalPrice}</span>
                      )}
                    </div>
                    {pkg.originalPrice && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-400/50 rounded-full mb-3">
                        <span className="text-green-300 text-sm font-semibold">
                          Save ${pkg.originalPrice - pkg.price}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(pkg)}
                    size="lg"
                    className={`w-full rounded-full py-4 text-lg font-medium shadow-lg transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                    }`}
                  >
                    Purchase {pkg.name} - ${pkg.price}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  {!user && (
                    <p className="text-xs text-white/60 text-center mt-3">
                      <Link to="/login" className="text-blue-400 hover:underline">Login</Link> or <Link to="/register" className="text-blue-400 hover:underline">Register</Link> to purchase
                    </p>
                  )}
                </Card>
              ))}
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
                      <div className="text-xs text-white/60 mt-1">Package: {testimonial.package}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Evanio */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose Evanio for Business Formation?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className={`w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 border-2 border-blue-400/30`}>
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* What's Included */}
          <GlassCard variant="cta" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                What's Included in Business Formation Service?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {whatsIncluded.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card glass key={index} className="p-6 flex items-start gap-4 border-2 border-white/20">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border-2 border-blue-400/50">
                        <span className="text-xl font-bold text-white">{item.number}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/50">
                        <Icon className="w-4 h-4 text-purple-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 leading-relaxed">{item.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* How It Works */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                How the Process Works
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card glass className="p-6 text-center border-2 border-white/20 hover:border-blue-400/50 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-400/50 relative z-10">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <Icon className="w-8 h-8 text-blue-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/80">{step.description}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Industries We Serve */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Industries We Serve
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <Card glass key={index} className="p-6 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <Icon className="w-10 h-10 text-blue-300 mx-auto mb-3" />
                    <p className="text-white font-semibold">{industry.name}</p>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Guarantee Section */}
          <GlassCard variant="cta" className="mb-16 p-8 md:p-12 text-center">
            <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Business Will Be Formed Successfully
            </h2>
            <p className="text-xl md:text-2xl text-green-400 font-semibold mb-4">
              Or Get Your Money Back
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Full refund as per our Money-Back Guarantee section.
            </p>
            <Link to="/refund-policy">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 text-lg font-medium backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30"
              >
                View Money-Back Guarantee
              </Button>
            </Link>
          </GlassCard>

          {/* Final CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Register Your Company?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Start your formation today with guaranteed compliance and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  if (currentPackages.length > 0) {
                    handlePurchase(currentPackages.find(p => p.popular) || currentPackages[1]);
                  }
                }}
                size="lg"
                className="rounded-full px-10 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Purchase Now</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30"
                >
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}
