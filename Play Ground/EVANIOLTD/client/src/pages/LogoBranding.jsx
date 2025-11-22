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
  Palette,
  Layers,
  FileText,
  Share2,
  Briefcase,
  Monitor,
  Zap,
  Sparkles,
  Award,
  Eye,
  Heart,
  Star,
  Circle,
  Square,
  Hexagon,
  Type,
  Image,
  PenTool,
  Paintbrush,
  Rocket,
  CreditCard,
  Clock,
  Shield,
  TrendingUp,
  Users,
  CheckCircle2,
  Quote,
  Grid3x3,
  Maximize2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

export default function LogoBranding() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);

  const handleAddonToggle = (addonName) => {
    setSelectedAddons(prev => 
      prev.includes(addonName)
        ? prev.filter(name => name !== addonName)
        : [...prev, addonName]
    );
  };

  const handleOrderClick = (pkg) => {
    setSelectedPackage(pkg);
    // Redirect to checkout with package and addon info
    const selectedAddonObjects = addons
      .filter(addon => selectedAddons.includes(addon.name))
      .map(addon => ({ name: addon.name, price: addon.price }));
    
    const params = new URLSearchParams({
      service: 'Logo & Branding',
      serviceSlug: 'logo-branding',
      package: pkg.name,
      packagePrice: pkg.price.toString(),
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
      icon: Palette,
      title: 'Custom Logo Design',
      description: 'Unique, modern, and professional logo concepts crafted for your business.',
    },
    {
      icon: Layers,
      title: 'Brand Identity System',
      description: 'A complete visual identity including colors, typography, icons, tone, and layout guides.',
    },
    {
      icon: FileText,
      title: 'Brand Guidelines Document',
      description: 'A professionally designed brand manual — essential for long-term brand consistency.',
    },
    {
      icon: Share2,
      title: 'Social Media Branding Pack',
      description: 'Profile images, covers, post templates, reels templates & story designs.',
    },
    {
      icon: Briefcase,
      title: 'Business Essentials',
      description: 'Business card, invoice, letterhead, email signature & banner design.',
    },
    {
      icon: Monitor,
      title: 'Website-Ready Assets',
      description: 'High-quality optimized files: PNG, SVG, JPG, Transparent, HD.',
    },
    {
      icon: Sparkles,
      title: 'Multiple Concepts & Revisions',
      description: 'We refine until your brand feels perfect.',
    },
    {
      icon: Phone,
      title: 'Free Consultancy',
      description: 'Phone • WhatsApp • Video Call — before the design work begins.',
    },
    {
      icon: Paintbrush,
      title: 'Custom Illustration Support',
      description: 'Get custom illustrations and graphics that perfectly match your brand identity.',
    },
  ];

  const packages = [
    {
      name: 'Basic Logo Package',
      subtitle: 'Perfect for starters & small businesses',
      price: 19,
      originalPrice: null,
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        '2 Original Logo Concepts',
        'Standard Color Palette',
        'Font Recommendation',
        'High-Quality Logo Files (PNG, JPG, Transparent)',
        '1 Revision',
        '2-Day Delivery',
      ],
    },
    {
      name: 'Standard Branding Identity',
      subtitle: 'Best value for growing brands',
      price: 49,
      originalPrice: null,
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        '3–4 Premium Logo Concepts',
        'Full Color Palette + Typography Guide',
        'Brand Rules (usage, spacing, colors)',
        'Social Media Kit',
        'Profile Logo',
        'Facebook Cover',
        'Instagram Templates',
        'Business Card Design',
        'Multiple Revisions',
        'All File Formats (PNG, JPG, SVG, PDF)',
        '3-Day Delivery',
      ],
    },
    {
      name: 'Premium Brand System',
      subtitle: 'Full professional brand package — for serious businesses',
      price: 99,
      originalPrice: null,
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        '5–7 Luxury Logo Concepts',
        'Complete Brand Identity System',
        'Full Brand Guidelines Book (12–20 pages)',
        'Social Media Branding Pack',
        'Covers, Posts, Stories, Reels Templates',
        'Business Card, Letterhead, Invoice Design',
        'Website Branding Assets',
        'Unlimited Revisions',
        'Source Files (AI, EPS, SVG, PNG, PDF)',
        'Priority Delivery (48 hours)',
        'Free Brand Launch Consultation',
      ],
    },
  ];

  const addons = [
    {
      name: 'Brand Video Intro',
      price: '$30',
    },
    {
      name: 'Mascot / 3D Logo',
      price: '$40',
    },
    {
      name: 'Packaging Design',
      price: '$20–$50',
    },
    {
      name: 'Flyer / Brochure Design',
      price: '$10–$25',
    },
  ];

  const whyMatters = [
    {
      icon: Eye,
      title: 'Stand out from competitors',
    },
    {
      icon: Heart,
      title: 'Increase trust instantly',
    },
    {
      icon: TrendingUp,
      title: 'Improve conversion & customer loyalty',
    },
    {
      icon: Award,
      title: 'Look professional and premium',
    },
    {
      icon: Star,
      title: 'Build long-term recognition',
    },
    {
      icon: Rocket,
      title: 'Accelerate business growth',
    },
  ];

  const logoTypes = [
    {
      name: 'Minimalist',
      icon: Circle,
    },
    {
      name: 'Typography logos',
      icon: Type,
    },
    {
      name: 'Mascot logos',
      icon: Image,
    },
    {
      name: 'Iconic symbol marks',
      icon: Square,
    },
    {
      name: 'Luxury monogram logos',
      icon: Hexagon,
    },
    {
      name: 'Geometric logos',
      icon: Square,
    },
    {
      name: 'Gradient / 3D style logos',
      icon: Circle,
    },
    {
      name: 'Corporate identity marks',
      icon: Briefcase,
    },
  ];

  const tools = [
    'Figma',
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Canva Pro',
    'Midjourney (AI concepts)',
    'Brand guidelines builder tools',
  ];

  const stats = [
    { number: '1,500+', label: 'Logos Designed', icon: Palette, color: 'text-blue-400' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
    { number: '2-3 Days', label: 'Fast Delivery', icon: Clock, color: 'text-green-400' },
    { number: '24/7', label: 'Support Available', icon: Zap, color: 'text-purple-400' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      company: 'TechStart',
      image: '👩‍💼',
      rating: 5,
      text: 'The Premium Brand System exceeded my expectations! The logo and brand guidelines are absolutely stunning. Our brand recognition has increased significantly.',
      package: 'Premium Brand System',
    },
    {
      name: 'Michael Chen',
      role: 'E-commerce Owner',
      company: 'ShopGlobal',
      image: '👨‍💼',
      rating: 5,
      text: 'Standard package was perfect for our needs. Fast delivery, professional quality, and the social media kit saved us so much time!',
      package: 'Standard Branding Identity',
    },
    {
      name: 'Emily Davis',
      role: 'Agency Owner',
      company: 'Creative Studio',
      image: '👩‍🎨',
      rating: 5,
      text: 'Basic package was great value. The logo concepts were creative and unique. Highly recommend Evanio for branding services!',
      package: 'Basic Logo Package',
    },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Tech Startup Branding',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      description: 'Modern minimalist logo with vibrant color palette',
    },
    {
      id: 2,
      title: 'E-commerce Brand Identity',
      category: 'Retail',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=300&fit=crop',
      description: 'Bold typography-based logo with comprehensive brand system',
    },
    {
      id: 3,
      title: 'Healthcare Branding',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      description: 'Professional and trustworthy brand identity',
    },
    {
      id: 4,
      title: 'Food & Beverage Logo',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400&h=300&fit=crop',
      description: 'Appetizing and memorable logo design',
    },
    {
      id: 5,
      title: 'Fashion Brand System',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      description: 'Luxury brand identity with elegant typography',
    },
    {
      id: 6,
      title: 'SaaS Platform Branding',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      description: 'Modern tech brand with clean, scalable design',
    },
  ];

  const whyChooseUs = [
    {
      icon: Sparkles,
      title: 'Premium & unique designs',
      description: 'No templates — every brand is hand-crafted.',
    },
    {
      icon: PenTool,
      title: 'Experienced designers',
      description: 'We understand market psychology, fonts, colors & brand behavior.',
    },
    {
      icon: Zap,
      title: 'Unlimited revisions (premium plan)',
      description: 'We refine until you love the final look.',
    },
    {
      icon: Clock,
      title: 'Fast delivery',
      description: 'High-quality brand ready in 24–48 hours.',
    },
    {
      icon: Shield,
      title: 'Lifetime asset support',
      description: 'Need more formats later? Just ask.',
    },
    {
      icon: Phone,
      title: 'Free consultation',
      description: 'We guide you on brand direction and style before starting.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Consultation',
      description: 'Share your business idea, style preference, and goals.',
    },
    {
      step: '2',
      title: 'Research & Concepting',
      description: 'We analyze your industry and craft unique concept ideas.',
    },
    {
      step: '3',
      title: 'Logo Design',
      description: '2–6 premium logo concepts depending on package.',
    },
    {
      step: '4',
      title: 'Refinements',
      description: 'Color, font, shapes — anything you want changed.',
    },
    {
      step: '5',
      title: 'Branding Package Delivery',
      description: 'Receive all files in HD + web formats.',
    },
    {
      step: '6',
      title: 'Brand Launch Support',
      description: 'We help you apply the branding across your website & social media.',
    },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Logo & Branding Services — Evanio</title>
        <meta name="description" content="Create a powerful visual identity that represents your business at its best. Premium logos and brand systems designed to elevate your business, attract customers, and build long-term recognition." />
        <meta name="keywords" content="logo design, branding services, brand identity, logo creation, brand guidelines, business branding" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/20 border-2 border-blue-400/50 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Logo & Branding Services
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Create a powerful visual identity that represents your business at its best.
            </p>
          </div>

          {/* Hero Section */}
          <GlassCard variant="hero" className="mb-12 text-center p-8 md:p-12">
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg text-white/90 mb-4">
                At Evanio, we craft premium logos and brand systems designed to elevate your business, attract customers, and build long-term recognition.
              </p>
              <p className="text-lg text-white/90">
                Your brand is more than a logo — it's your first impression, your identity, and your trust signal.
              </p>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="p-4 md:p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Your Branding Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-green-600/80 border border-green-500/50 text-white hover:bg-green-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Book a Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* What You Get Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What You Get with Evanio Branding
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

          {/* Pricing Plans Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Branding Pricing Plans — Evanio
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {packages.map((pkg, index) => (
                <GlassCard
                  key={index}
                  variant="default"
                  className={`p-6 border-2 ${pkg.borderColor} ${pkg.bgColor} relative flex flex-col`}
                >
                  <div className="text-center mb-6">
                    <h3 className={`text-2xl font-bold ${pkg.color} mb-2`}>{pkg.name}</h3>
                    <p className="text-white/70 text-sm mb-4">{pkg.subtitle}</p>
                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <span className={`text-4xl md:text-5xl font-bold ${pkg.color}`}>
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
                  </div>
                  <div className="mb-4">
                    <p className="text-white/90 font-semibold mb-3">Includes:</p>
                  </div>
                  <ul className="space-y-2 text-left flex-grow mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleOrderClick(pkg)}
                    className={`mt-auto w-full rounded-full px-6 py-3 font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
                      index === 1 
                        ? 'bg-green-600/80 border-green-500/50 hover:bg-green-600/90' 
                        : index === 2
                        ? 'bg-orange-600/80 border-orange-500/50 hover:bg-orange-600/90'
                        : 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-600/90'
                    }`}
                  >
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </GlassCard>
              ))}
            </div>

            {/* Add-ons Section */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                ⚡ Add-ons (Optional)
              </h3>
              <p className="text-white/70 text-center mb-6 max-w-2xl mx-auto">
                Select any add-ons you'd like to include with your package
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
                        <p className="text-white font-semibold">{addon.name}</p>
                      </div>
                      <p className="text-blue-400 font-bold">{addon.price}</p>
                    </div>
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

          {/* Why Branding Matters Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Branding Matters
            </h2>
            <p className="text-lg md:text-xl text-white/80 text-center mb-8 max-w-3xl mx-auto">
              A strong brand helps you:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whyMatters.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Types of Logos Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Types of Logos We Create
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {logoTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div
                    key={index}
                    className="p-4 text-center backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium">{type.name}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Tools Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Tools & Technologies We Use
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {tools.map((tool, index) => (
                <div key={index} className="text-white/80 flex items-center gap-2 p-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  {tool}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Branding?
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

          {/* Testimonials Section */}
          <div className="mb-12">
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
                  <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/70">{testimonial.role}</div>
                      <div className="text-xs text-white/60 mt-1">Package: {testimonial.package}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Interactive Portfolio Showcase */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Our Portfolio
                </h2>
                <p className="text-white/80">Explore our recent branding projects</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-white/60" />
                <span className="text-white/60 text-sm">{portfolioItems.length} Projects</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPortfolioItem(item)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(item.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 text-white/90 text-xs">
                          <span className="px-2 py-1 bg-white/20 rounded-full">{item.category}</span>
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Portfolio Modal */}
          {selectedPortfolioItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPortfolioItem(null)}
            >
              <div
                className="relative max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPortfolioItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ×
                </button>
                <img
                  src={selectedPortfolioItem.image}
                  alt={selectedPortfolioItem.title}
                  className="w-full h-auto rounded-xl mb-4"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(selectedPortfolioItem.title)}`;
                  }}
                />
                <h3 className="text-2xl font-bold text-white mb-2">{selectedPortfolioItem.title}</h3>
                <p className="text-white/80 mb-4">{selectedPortfolioItem.description}</p>
                <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-blue-300 text-sm">
                  {selectedPortfolioItem.category}
                </span>
              </div>
            </div>
          )}

          {/* Process Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Branding Process
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

          {/* CTA Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Brand with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's design a premium brand identity that stands out and makes an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Your Branding Project
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

