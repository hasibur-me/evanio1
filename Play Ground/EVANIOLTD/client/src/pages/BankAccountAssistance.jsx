import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/Button';
import { 
  Phone, 
  MessageCircle, 
  Video, 
  Check, 
  ArrowRight,
  Building2,
  FileText,
  Shield,
  Globe,
  Users,
  Briefcase,
  Store,
  Code,
  ShoppingBag,
  Layers,
  Award,
  Zap,
  Clock,
  Wallet,
  CreditCard,
  Rocket,
  Star,
  Quote,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

export default function BankAccountAssistance() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddonToggle = (addonName) => {
    setSelectedAddons(prev => 
      prev.includes(addonName)
        ? prev.filter(name => name !== addonName)
        : [...prev, addonName]
    );
  };

  const handleOrderClick = (pkg) => {
    if (pkg.price.toLowerCase().includes('contact')) {
      window.location.href = '/contact';
      return;
    }
    setSelectedPackage(pkg);
    const selectedAddonObjects = addons
      .filter(addon => selectedAddons.includes(addon.name))
      .map(addon => ({ name: addon.name, price: addon.price }));
    
    const priceMatch = pkg.price.match(/[\d.]+/);
    const packagePrice = priceMatch ? priceMatch[0] : '0';
    
    const params = new URLSearchParams({
      service: 'Bank Account Opening Assistance',
      serviceSlug: 'bank-account-assistance',
      package: pkg.name,
      packagePrice: packagePrice,
      addons: JSON.stringify(selectedAddonObjects),
    });
    window.location.href = `/checkout?${params.toString()}`;
  };
  const consultationMethods = [
    {
      icon: Phone,
      title: 'Free Phone Call',
      description: 'Get instant expert guidance over the phone',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
    },
    {
      icon: MessageCircle,
      title: 'Free WhatsApp Consultation',
      description: 'Fast & easy — perfect for quick questions',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
    },
    {
      icon: Video,
      title: 'Free Video Call Session',
      description: 'For full strategy sessions',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: 'Step-by-Step Account Opening Support',
      description: 'Full guidance from start to finish — no complex forms, no guesswork.',
    },
    {
      icon: FileText,
      title: 'Preparation of Required Documents',
      description: 'We help you prepare documents like: Business formation papers, EIN / Tax ID, Operating agreement, Proof of address, Identity verification (Simplified based on your destination bank).',
    },
    {
      icon: Check,
      title: 'Eligibility Check',
      description: 'We match your business type with the correct banking partner.',
    },
    {
      icon: Building2,
      title: 'Application Submission Guidance',
      description: 'We guide you through the entire online submission process.',
    },
    {
      icon: Shield,
      title: 'Verification Support',
      description: 'We help complete ID verification fast and correctly.',
    },
    {
      icon: Globe,
      title: 'Banking Options for Global Founders',
      description: 'No need to live in the U.S. or U.K. — we assist fully remotely.',
    },
    {
      icon: Phone,
      title: 'Free Consultancy Before Starting',
      description: 'Phone, WhatsApp, or Video Call — at zero cost.',
    },
    {
      icon: CreditCard,
      title: 'Account Activation & Setup',
      description: 'We help you activate your account and set up online banking, transfers, and payment options.',
    },
    {
      icon: Clock,
      title: 'Ongoing Account Support',
      description: 'Continuous assistance with account management, transactions, and any banking-related questions.',
    },
  ];

  const packages = [
    {
      name: 'Basic Bank Setup Support',
      subtitle: 'Perfect for beginners who need simple guidance',
      price: '$99',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        'Basic consultation (Free)',
        'Checklist of required documents',
        'Guidance for USA/UK/EU fintech banks',
        'Eligibility review',
        'Simple application support',
        'Email support',
        '24–48 hour delivery',
      ],
    },
    {
      name: 'Standard Bank Account Assistance',
      subtitle: 'Best value for entrepreneurs & small businesses',
      price: '$149',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        'Bank selection guidance (USA/UK/EU)',
        'Full document preparation',
        'Step-by-step application support',
        'Verification assistance (ID + business info)',
        'Business model review for approval',
        'Multi-currency guidance (Wise/Payoneer)',
        '1-on-1 WhatsApp support',
        '24–48 hour delivery',
      ],
    },
    {
      name: 'Premium Global Account Setup',
      subtitle: 'Complete banking setup for international founders',
      price: '$199',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        'USA Bank Account Setup (Mercury / Relay / Novo / Wise)',
        'UK/Europe Fintech Account Setup',
        'Full eligibility analysis',
        'Website/business compliance review',
        'Document preparation for approval',
        'Live call support (Zoom/WhatsApp)',
        'Business verification assistance',
        'Multi-currency + card setup help',
        'Priority support',
        '12-month follow-up assistance',
        'Fast delivery within 24 hours (priority)',
      ],
    },
    {
      name: 'Enterprise / High-Compliance Banking Setup',
      subtitle: 'For SaaS, agencies, marketplaces & global brands',
      price: 'contact us',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
      features: [
        'USA + UK + EU bank setup (multi-region)',
        'UBO structure guidance',
        'High-compliance document preparation',
        'Proof-of-business setup',
        'Website + model compliance optimization',
        'Full verification support (ID, video, business background)',
        'Payment gateway linking guidance (Stripe, PayPal)',
        'Priority 1-on-1 specialist',
        '60 days extended support',
      ],
    },
  ];

  const addons = [
    {
      name: 'Custom Address Solutions (virtual address)',
      price: '$20–50',
    },
    {
      name: 'Bank Statement Editing / Formatting Help',
      price: '$20',
    },
    {
      name: 'Stripe / PayPal Linking Support',
      price: '$30',
    },
    {
      name: 'Business Name Check + Document Formatting',
      price: '$10–15',
    },
    {
      name: 'Faster Delivery (Same Day)',
      price: '$10',
    },
  ];

  const bankingOptions = [
    {
      region: 'USA',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      options: [
        'Mercury',
        'Relay',
        'Novo',
        'Wise Business',
        'Payoneer Business',
        'Startup-friendly financial institutions',
      ],
    },
    {
      region: 'United Kingdom',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      options: [
        'Wise Business',
        'Revolut Business',
        'Monzo Business (eligibility required)',
      ],
    },
    {
      region: 'Europe',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      options: [
        'N26 Business',
        'Payoneer',
        'Local EU fintech banks',
      ],
    },
    {
      region: 'Bangladesh / Asia',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
      options: [
        'bKash Merchant',
        'Nagad Business',
        'City Bank / DBBL / BRAC (requirements vary)',
      ],
    },
    {
      region: 'International Multi-Currency Accounts',
      color: 'text-indigo-300',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-400/50',
      options: [
        'Wise Business',
        'Payoneer',
        'Airwallex',
      ],
    },
    {
      region: 'Canada',
      color: 'text-red-300',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400/50',
      options: [
        'RBC Business',
        'TD Business Banking',
        'Scotia Business',
        'Wise Business',
        'Local Canadian fintech options',
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Knowledge of Banking Requirements',
      description: 'We know what documents each platform requires and how to prepare them perfectly.',
    },
    {
      icon: Zap,
      title: 'Fast Approval Support',
      description: 'We optimize your application so verifications are completed quickly.',
    },
    {
      icon: Globe,
      title: 'Global Founder Friendly',
      description: 'Even if you live outside the U.S. / U.K., we help you get a business bank account.',
    },
    {
      icon: Wallet,
      title: 'Transparent Process',
      description: 'Clear guidance with no hidden fees.',
    },
    {
      icon: Shield,
      title: 'Help With Compliance & Verification',
      description: 'Address, ID, website, and business model review included.',
    },
    {
      icon: Phone,
      title: 'Free Pre-Setup Consultation',
      description: 'We help you understand which bank is best for your business type.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Consultation',
      description: 'We review your business and advise the best banking options.',
    },
    {
      step: '2',
      title: 'Document Preparation',
      description: 'We help gather and prepare all required documents.',
    },
    {
      step: '3',
      title: 'Apply With the Right Banking Partner',
      description: 'We guide you through every step, live on call if needed.',
    },
    {
      step: '4',
      title: 'Verification Assistance',
      description: 'ID verification, selfie verification, business details — all guided.',
    },
    {
      step: '5',
      title: 'Account Activation',
      description: 'Once approved, we help set up transfers, cards, and multi-currency options.',
    },
    {
      step: '6',
      title: 'Payment Gateway Ready',
      description: 'We help connect your bank with Stripe, PayPal, and more.',
    },
  ];

  const targetAudience = [
    {
      name: 'Startups',
      icon: Rocket,
    },
    {
      name: 'Freelancers',
      icon: Users,
    },
    {
      name: 'E-commerce owners',
      icon: ShoppingBag,
    },
    {
      name: 'Dropshippers',
      icon: Store,
    },
    {
      name: 'Software companies',
      icon: Code,
    },
    {
      name: 'Agencies',
      icon: Briefcase,
    },
    {
      name: 'International entrepreneurs',
      icon: Globe,
    },
    {
      name: 'Anyone needing a U.S./U.K./global business bank account',
      icon: Building2,
    },
  ];

  const stats = [
    { number: '500+', label: 'Accounts Opened', icon: Building2, color: 'text-blue-400' },
    { number: '95%', label: 'Success Rate', icon: CheckCircle2, color: 'text-green-400' },
    { number: '24-48h', label: 'Fast Setup', icon: Clock, color: 'text-yellow-400' },
    { number: '50+', label: 'Banking Partners', icon: Globe, color: 'text-purple-400' },
  ];

  const testimonials = [
    {
      name: 'James Wilson',
      role: 'E-commerce Founder',
      company: 'GlobalStore',
      image: '👨‍💼',
      rating: 5,
      text: 'Premium Global Account Setup was worth every penny! Got my Mercury account approved in 2 days. The team guided me through every step.',
      package: 'Premium Global Account Setup',
    },
    {
      name: 'Maria Garcia',
      role: 'SaaS Founder',
      company: 'CloudTech',
      image: '👩‍💼',
      rating: 5,
      text: 'Standard package helped me open accounts in both USA and UK. Professional service and excellent support throughout the process.',
      package: 'Standard Bank Account Assistance',
    },
    {
      name: 'David Kim',
      role: 'Agency Owner',
      company: 'Digital Agency',
      image: '👨‍💻',
      rating: 5,
      text: 'Basic setup was perfect for my needs. Quick, affordable, and got my Wise Business account set up without any hassle.',
      package: 'Basic Bank Setup Support',
    },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Bank Account Opening Assistance — Evanio</title>
        <meta name="description" content="Navigate the complexities of opening business bank accounts with our expert assistance. We help you find the right bank, prepare required documents, and guide you through the entire process." />
        <meta name="keywords" content="bank account opening, business bank account, banking assistance, business banking, international banking" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/20 border-2 border-blue-400/50 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Bank Account Opening Assistance
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Navigate the complexities of opening business bank accounts with our expert assistance. We help you find the right bank, prepare required documents, and guide you through the entire process.
            </p>
          </div>

          {/* Statistics Dashboard */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-white/80 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Hero Section */}
          <GlassCard variant="hero" className="mb-12 text-center p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bank Account Opening Assistance
            </h2>
            
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg text-white/90 mb-4">
                Secure, fast, and hassle-free business bank account setup for global entrepreneurs.
              </p>
              <p className="text-lg text-white/90 mb-4">
                Opening a business bank account can be confusing, especially for international founders.
              </p>
              <p className="text-lg text-white/90 mb-4">
                At Evanio, we make the process simple, compliant, and fully guided — helping you open a verified business account with trusted financial institutions.
              </p>
              <p className="text-lg text-white/90">
                Whether you need a U.S., U.K., or international account, we ensure your business meets all requirements and gets approved fast.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Bank Account Setup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-green-600/80 border border-green-500/50 text-white hover:bg-green-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* What You Get Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What You Get With Evanio's Bank Account Assistance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 border border-green-400/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/80 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Testimonials Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index} variant="default" className="p-6 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                  <p className="text-white/90 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">{testimonial.role}</div>
                      <div className="text-blue-400 text-xs mt-1">{testimonial.package}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* Pricing Plans Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Bank Account Opening Assistance — Premium Pricing Table (Evanio)
            </h2>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Choose the perfect package for your business banking needs. All packages include free consultation and expert guidance.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {packages.map((pkg, index) => (
                <GlassCard
                  key={index}
                  variant="default"
                  className={`p-6 border-2 ${pkg.borderColor} ${pkg.bgColor} relative flex flex-col`}
                >
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold ${pkg.color} mb-2`}>{pkg.name}</h3>
                    <p className="text-white/70 text-xs mb-4">{pkg.subtitle}</p>
                    <div className={`text-3xl md:text-4xl font-bold ${pkg.color} mb-2`}>
                      {pkg.price}
                    </div>
                    {!pkg.price.toLowerCase().includes('contact') && (
                      <div className="text-white/60 text-xs">One-time payment</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-white/90 font-semibold mb-3 text-sm">Includes:</p>
                  </div>
                  <ul className="space-y-2 text-left flex-grow mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-start gap-2 text-xs">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.price.toLowerCase().includes('contact') ? (
                    <Link to="/contact">
                      <button
                        className={`mt-auto w-full rounded-full px-4 py-2.5 text-sm font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
                          index === 3
                            ? 'bg-yellow-600/80 border-yellow-500/50 hover:bg-yellow-600/90'
                            : 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-600/90'
                        }`}
                      >
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleOrderClick(pkg)}
                      className={`mt-auto w-full rounded-full px-4 py-2.5 text-sm font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
                        index === 0 
                          ? 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-600/90' 
                          : index === 1
                          ? 'bg-green-600/80 border-green-500/50 hover:bg-green-600/90'
                          : index === 2
                          ? 'bg-orange-600/80 border-orange-500/50 hover:bg-orange-600/90'
                          : 'bg-yellow-600/80 border-yellow-500/50 hover:bg-yellow-600/90'
                      }`}
                    >
                      Order Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  )}
                </GlassCard>
              ))}
            </div>

            {/* Add-ons Section */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                🔧 Add-Ons (Optional)
              </h3>
              <p className="text-white/70 text-center mb-6 max-w-2xl mx-auto text-sm">
                Select any add-ons you'd like to include with your package
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                {addons.map((addon, index) => {
                  const isSelected = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={index}
                      onClick={() => handleAddonToggle(addon.name)}
                      className={`p-4 text-center backdrop-blur-sm border rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-500/30 border-blue-400/70 border-2'
                          : 'bg-white/10 border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className={`w-5 h-5 rounded border-2 mr-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 border-blue-400'
                            : 'border-white/40 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-white font-semibold text-xs">{addon.name}</p>
                      </div>
                      <p className="text-blue-400 font-bold text-sm">{addon.price}</p>
                    </div>
                  );
                })}
              </div>
              {selectedAddons.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-white/80 mb-2 text-sm">
                    Selected Add-ons: <span className="text-green-400 font-semibold">{selectedAddons.join(', ')}</span>
                  </p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Banking Options Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Business Banks & FinTechs We Support
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bankingOptions.map((option, index) => (
                <GlassCard
                  key={index}
                  variant="default"
                  className={`p-6 border-2 ${option.borderColor} ${option.bgColor}`}
                >
                  <h3 className={`text-xl font-bold ${option.color} mb-4 text-center`}>{option.region}</h3>
                  <ul className="space-y-2">
                    {option.options.map((item, idx) => (
                      <li key={idx} className="text-white/80 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Bank Account Assistance?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 border border-green-400/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Process Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Bank Account Setup Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500/30 border-2 border-blue-400/50 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <GlassCard variant="default" className="p-6 h-full">
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/80">{step.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Target Audience Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Who Is This Service For?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {targetAudience.map((audience, index) => {
                const Icon = audience.icon;
                return (
                  <div
                    key={index}
                    className="p-4 text-center backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">{audience.name}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* CTA Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Open Your Business Bank Account with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's help you get verified, approved, and ready to receive payments globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Bank Account Setup
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-green-600/80 border border-green-500/50 text-white hover:bg-green-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
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

