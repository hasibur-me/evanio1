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
  Phone, 
  MessageCircle, 
  Video, 
  Check, 
  ArrowRight,
  CreditCard,
  Shield,
  Globe,
  Zap,
  BarChart3,
  FileText,
  Plug,
  Sparkles,
  Rocket,
  Clock,
  Award,
  Store,
  Briefcase,
  Layers,
  Users,
  ShoppingBag,
  Monitor,
  Code,
  Wallet,
  Star,
  CheckCircle2,
  Quote,
  TrendingUp
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function PaymentGatewaySetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const stats = [
    { number: '3,000+', label: 'Gateways Setup', icon: CreditCard, color: 'text-blue-400' },
    { number: '99.9%', label: 'Success Rate', icon: Award, color: 'text-green-400' },
    { number: '24-48hrs', label: 'Fast Setup', icon: Clock, color: 'text-purple-400' },
    { number: '24/7', label: 'Support Available', icon: Zap, color: 'text-yellow-400' },
  ];

  const packages = [
    {
      name: 'Basic Payment Setup',
      price: 99,
      originalPrice: null,
      popular: false,
      duration: '24 hours',
      features: [
        'Stripe OR PayPal setup',
        'Account creation & verification guidance',
        'Basic website compliance check',
        'Simple checkout button integration',
        'Test payment ready',
        'Email support',
        'Basic documentation',
      ],
    },
    {
      name: 'Standard Multi-Gateway Setup',
      price: 149,
      originalPrice: null,
      popular: true,
      duration: '48 hours',
      features: [
        'Stripe + PayPal setup',
        'Wise / Payoneer linking support',
        'Full business compliance review',
        'Checkout, donation, and subscription integration',
        'API key setup + webhook setup',
        'Test transactions',
        'Fraud protection configuration',
        '1-on-1 support on WhatsApp',
        'Priority email support',
        'Complete integration documentation',
      ],
    },
    {
      name: 'Premium Global Payment Activation',
      price: 299,
      originalPrice: null,
      popular: false,
      duration: '24-48 hours',
      features: [
        'Stripe + PayPal + Wise + Payoneer + SSLCommerz (if needed)',
        'Full verification + website compliance + business model matching',
        'Custom checkout (Stripe Elements / Payment Links)',
        'Full API integration with React, WordPress, Shopify, or Webflow',
        'Subscription systems + recurring payments setup',
        'Fraud detection + risk-level tuning',
        'Payout scheduling + currency configuration',
        'Multi-platform integration (mobile/web)',
        'Priority WhatsApp support',
        'Free follow-up support for 30 days',
        'Advanced analytics setup',
      ],
    },
    {
      name: 'Enterprise / SaaS Suite',
      price: null, // Contact us
      originalPrice: null,
      popular: false,
      duration: 'Custom',
      isCustom: true,
      features: [
        'Stripe Custom Integration (Stripe Connect / Marketplace)',
        'Advanced API setup',
        'Usage-based, metered & subscription billing',
        'Multi-vendor payout systems',
        'Role-based dashboard flow setup',
        'Risk assessment + high compliance setup',
        'Complete payment automation',
        'Dedicated payment specialist',
        'Priority same-day delivery',
        'Ongoing support for 60 days',
        'Custom payment dashboard UI',
        'White-label payment solutions',
      ],
    },
  ];

  const addons = [
    {
      name: 'Payment Dispute Handling Setup',
      price: 20,
    },
    {
      name: 'Recurring Subscription Logic (SaaS)',
      price: 40,
    },
    {
      name: 'Custom Payment Dashboard UI',
      price: 75,
    },
    {
      name: 'Mobile Payment Integration',
      price: 25,
    },
  ];

  const testimonials = [
    {
      name: 'Alex Thompson',
      role: 'E-commerce Owner',
      company: 'Online Store',
      image: '👨‍💼',
      rating: 5,
      text: 'Standard package was perfect! Got Stripe and PayPal set up in 2 days. The integration works flawlessly.',
      package: 'Standard Multi-Gateway',
    },
    {
      name: 'Maria Garcia',
      role: 'SaaS Founder',
      company: 'CloudPlatform',
      image: '👩‍💻',
      rating: 5,
      text: 'Enterprise package delivered everything we needed. The subscription billing system is perfect for our SaaS.',
      package: 'Enterprise / SaaS Suite',
    },
    {
      name: 'John Smith',
      role: 'Freelancer',
      company: 'Design Studio',
      image: '👨‍🎨',
      rating: 5,
      text: 'Basic setup was quick and affordable. Now I can accept payments from clients worldwide!',
      package: 'Basic Payment Setup',
    },
  ];

  const benefits = [
    {
      icon: CreditCard,
      title: 'Full Account Creation & Verification',
      description: 'We handle the entire setup of your payment gateway accounts — from registration to verification.',
      color: 'text-blue-400'
    },
    {
      icon: FileText,
      title: 'Compliance & Business Matching',
      description: 'We prepare your website, business info, and financial details to meet gateway requirements.',
      color: 'text-green-400'
    },
    {
      icon: Plug,
      title: 'Integration With Your Website',
      description: 'Stripe Checkout, PayPal buttons, Webhooks, API integration, subscriptions & more.',
      color: 'text-purple-400'
    },
    {
      icon: Globe,
      title: 'Global Payment Capability',
      description: 'Accept payments from any country, any currency (depending on provider).',
      color: 'text-pink-400'
    },
    {
      icon: Shield,
      title: 'Fraud & Security Configuration',
      description: 'We set up alerts, 3D secure, protections, and compliance settings.',
      color: 'text-orange-400'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Setup & Training',
      description: 'We help you understand your payment portal, payouts, fees, and analytics.',
      color: 'text-yellow-400'
    },
    {
      icon: Phone,
      title: 'Free Consultancy Before Setup',
      description: 'Phone, WhatsApp, or Video Call — zero cost.',
      color: 'text-cyan-400'
    },
    {
      icon: Clock,
      title: '24/7 Payment Monitoring',
      description: 'Continuous monitoring and support to ensure your payment system runs smoothly.',
      color: 'text-teal-400'
    },
    {
      icon: Rocket,
      title: 'Quick Launch Support',
      description: 'Get your payment gateway live and processing payments in record time.',
      color: 'text-indigo-400'
    },
  ];

  const gateways = [
    {
      name: 'Stripe',
      description: 'Full account setup, website compliance, activation assistance, API integration.',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
    },
    {
      name: 'PayPal Business',
      description: 'Verification, linking bank accounts/cards, integration for checkout.',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
    },
    {
      name: 'Wise Business',
      description: 'Multi-currency account setup & integration.',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
    },
    {
      name: 'Payoneer',
      description: 'Global payment receiving setup.',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
    },
    {
      name: 'SSLCommerz (Bangladesh)',
      description: 'Gateway activation, sandbox/live configuration.',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
    },
    {
      name: '2Checkout (Verifone)',
      description: 'International card processing for digital products & SaaS.',
      color: 'text-indigo-300',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-400/50',
    },
    {
      name: 'Mollie / Paddle / Square',
      description: 'Perfect for Europe, SaaS, and subscription businesses.',
      color: 'text-pink-300',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-400/50',
    },
    {
      name: 'Razorpay',
      description: 'Popular payment gateway for India and Southeast Asia markets.',
      color: 'text-teal-300',
      bgColor: 'bg-teal-500/20',
      borderColor: 'border-teal-400/50',
    },
    {
      name: 'Authorize.Net',
      description: 'Enterprise-grade payment processing with advanced fraud detection.',
      color: 'text-cyan-300',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-400/50',
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'We Know the Approval Requirements',
      description: 'We ensure your website, business structure, and documentation meet all gateway standards.',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'Fast Activation',
      description: 'No delays — we handle the full verification process end-to-end.',
      color: 'text-green-400'
    },
    {
      icon: Check,
      title: 'Zero Rejections',
      description: 'We structure your application perfectly so your gateway gets approved on the first attempt.',
      color: 'text-yellow-400'
    },
    {
      icon: Code,
      title: 'Seamless Technical Integration',
      description: 'We connect APIs, webhooks, checkout pages, and payment flows flawlessly.',
      color: 'text-purple-400'
    },
    {
      icon: Monitor,
      title: 'Multi-Platform Support',
      description: 'Whether your website is on React, WordPress, Shopify, Webflow, or custom — we set it up.',
      color: 'text-pink-400'
    },
    {
      icon: Wallet,
      title: 'Transparent Pricing',
      description: 'No hidden charges. Only premium service and support.',
      color: 'text-orange-400'
    },
    {
      icon: Shield,
      title: 'Lifetime Assistance',
      description: 'Need updates or help later? Evanio is always here.',
      color: 'text-cyan-400'
    },
    {
      icon: Sparkles,
      title: 'Custom Payment Solutions',
      description: 'Tailored payment flows designed specifically for your business model and needs.',
      color: 'text-teal-400'
    },
    {
      icon: Users,
      title: 'Expert Team Support',
      description: 'Work with experienced payment specialists who understand global payment ecosystems.',
      color: 'text-indigo-400'
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Consultation',
      description: 'We understand your business model and payment requirements.',
      icon: Phone,
    },
    {
      step: '2',
      title: 'Documentation & Compliance Check',
      description: 'We help prepare your website and business details for approval.',
      icon: FileText,
    },
    {
      step: '3',
      title: 'Gateway Account Setup',
      description: 'Stripe, PayPal, Wise, or any gateway — created & configured properly.',
      icon: CreditCard,
    },
    {
      step: '4',
      title: 'Integration on Website',
      description: 'Checkout integration, subscription setup, API keys, webhooks, testing.',
      icon: Plug,
    },
    {
      step: '5',
      title: 'Test Transactions',
      description: 'We run test payments to ensure everything works perfectly.',
      icon: Shield,
    },
    {
      step: '6',
      title: 'Full Launch',
      description: 'Your payment system goes live and starts receiving payments instantly.',
      icon: Rocket,
    },
  ];

  const industries = [
    {
      name: 'E-commerce',
      icon: ShoppingBag,
    },
    {
      name: 'SaaS',
      icon: Code,
    },
    {
      name: 'Agencies',
      icon: Briefcase,
    },
    {
      name: 'Dropshipping',
      icon: Store,
    },
    {
      name: 'Digital products',
      icon: FileText,
    },
    {
      name: 'Consultants & freelancers',
      icon: Users,
    },
    {
      name: 'International businesses',
      icon: Globe,
    },
    {
      name: 'Subscription businesses',
      icon: Layers,
    },
  ];

  const handleAddonToggle = (addonName) => {
    setSelectedAddons(prev => 
      prev.includes(addonName)
        ? prev.filter(name => name !== addonName)
        : [...prev, addonName]
    );
  };

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    const selectedAddonObjects = addons
      .filter(addon => selectedAddons.includes(addon.name))
      .map(addon => ({ name: addon.name, price: addon.price }));
    
    const params = new URLSearchParams({
      service: 'Payment Gateway Setup',
      serviceSlug: 'payment-gateway-setup',
      package: pkg.name,
      packagePrice: pkg.price.toString(),
      addons: JSON.stringify(selectedAddonObjects),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Payment Gateway Setup — Evanio | Premium Payment Integration Services</title>
        <meta name="description" content="Accept payments from customers worldwide with our payment gateway setup service. We integrate Stripe, PayPal, Wise, Payoneer, and other payment processors into your website or platform." />
        <meta name="keywords" content="payment gateway setup, stripe integration, paypal setup, payment processing, payment integration" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">3,000+ Payment Gateways Setup Successfully</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Payment Gateway Setup
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Accept Payments Globally
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              Accept payments from customers worldwide with complete setup, verification, and integration done for you.
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
                Choose Your Payment Gateway Package
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Select the perfect package for your business needs. All packages include full setup, verification, and integration.
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {packages.map((pkg, index) => (
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
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                    {pkg.isCustom ? (
                      <div className="mb-2">
                        <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          Contact Us
                        </span>
                        <p className="text-white/70 text-sm mt-2">Custom pricing for your needs</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-center gap-3 mb-2">
                          <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-xl text-white/50 line-through">${pkg.originalPrice}</span>
                          )}
                        </div>
                        {pkg.originalPrice && (
                          <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-400/50 rounded-full mb-3">
                            <span className="text-green-300 text-sm font-semibold">
                              Save ${pkg.originalPrice - pkg.price}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.isCustom ? (
                    <Link to="/contact">
                      <Button
                        size="lg"
                        className="w-full rounded-full py-3 text-base font-medium shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        Contact Us for Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(pkg)}
                      size="lg"
                      className={`w-full rounded-full py-3 text-base font-medium shadow-lg transition-all duration-300 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                      }`}
                    >
                      Purchase - ${pkg.price}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                  
                  {!user && (
                    <p className="text-xs text-white/60 text-center mt-3">
                      <Link to="/login" className="text-blue-400 hover:underline">Login</Link> or <Link to="/register" className="text-blue-400 hover:underline">Register</Link> to purchase
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {/* Add-ons Section */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                ⚡ Optional Add-ons
              </h3>
              <p className="text-white/70 text-center mb-6 max-w-2xl mx-auto">
                Select any add-ons you'd like to include with your package
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {addons.map((addon, index) => {
                  const isSelected = selectedAddons.includes(addon.name);
                  return (
                    <Card
                      key={index}
                      glass
                      onClick={() => handleAddonToggle(addon.name)}
                      className={`p-4 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                        isSelected
                          ? 'bg-blue-500/30 border-2 border-blue-400/70'
                          : 'bg-white/10 border border-white/20 hover:border-white/40'
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
                        <p className="text-white font-semibold text-sm">{addon.name}</p>
                      </div>
                      <p className="text-blue-400 font-bold">${addon.price}</p>
                    </Card>
                  );
                })}
              </div>
              {selectedAddons.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-white/80 mb-2">
                    Selected Add-ons: <span className="text-green-400 font-semibold">{selectedAddons.join(', ')}</span>
                  </p>
                </div>
              )}
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

          {/* What You Get Section */}
          <GlassCard variant="cta" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What You Get With Evanio Payment Setup
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-400/30`}>
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

          {/* Payment Gateways Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Payment Gateways We Support
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gateways.map((gateway, index) => (
                <Card
                  key={index}
                  glass
                  className={`p-6 text-center border-2 ${gateway.borderColor} ${gateway.bgColor} hover:scale-105 transition-transform duration-300`}
                >
                  <div className={`w-16 h-16 ${gateway.bgColor} ${gateway.borderColor} border-2 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <CreditCard className={`w-8 h-8 ${gateway.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{gateway.name}</h3>
                  <p className="text-white/80">{gateway.description}</p>
                </Card>
              ))}
            </div>
          </GlassCard>

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Payment Setup?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-400/30`}>
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/80 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Process Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Payment Gateway Setup Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card glass className="p-6 h-full border-2 border-white/20 hover:border-blue-400/50 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-400/50 relative z-10">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <Icon className="w-8 h-8 text-blue-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2 text-center">{step.title}</h3>
                      <p className="text-white/80 text-center">{step.description}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Industries Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Industries We Support
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <Card
                    key={index}
                    glass
                    className="p-4 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium">{industry.name}</p>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Final CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Activate Your Payment Gateway?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's help you accept payments globally with a fully verified, secure, and fast setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  if (packages.length > 0) {
                    handlePurchase(packages.find(p => p.popular) || packages[1]);
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
                  Book Free Consultation
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
