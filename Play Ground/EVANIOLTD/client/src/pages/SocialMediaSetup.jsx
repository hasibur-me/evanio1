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
  Share2,
  Palette,
  FileText,
  Globe,
  Search,
  Sparkles,
  Award,
  Zap,
  Clock,
  Rocket,
  Shield,
  Eye,
  Layers,
  Image,
  Video as VideoIcon,
  MessageSquare,
  Twitter,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

export default function SocialMediaSetup() {
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
      service: 'Social Media Setup',
      serviceSlug: 'social-media-setup',
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
      icon: Palette,
      title: 'Branding Across All Platforms',
      description: 'Professional profile picture, cover photo, and theme-based visuals.',
    },
    {
      icon: FileText,
      title: 'Complete Profile Optimization',
      description: 'We fill out every section strategically — bios, links, category, tags.',
    },
    {
      icon: Search,
      title: 'SEO-Optimized Bios & Descriptions',
      description: 'Search-friendly descriptions tailored to your industry.',
    },
    {
      icon: Sparkles,
      title: 'Call-to-Action Setup',
      description: 'Buttons like Book Now, Send Message, Shop Now, Learn More.',
    },
    {
      icon: Image,
      title: 'Highlight Story Design (Instagram)',
      description: 'Custom highlight icons & story collections.',
    },
    {
      icon: Share2,
      title: 'Facebook Page Settings Setup',
      description: 'Roles, messaging, notifications, templates, permissions, business info.',
    },
    {
      icon: Layers,
      title: 'Initial Posting Pack',
      description: '5–10 branded launch posts (optional add-on).',
    },
    {
      icon: Phone,
      title: 'Free Consultancy Before Setup',
      description: 'Phone • WhatsApp • Video Call — anytime.',
    },
    {
      icon: Rocket,
      title: 'Growth-Focused Strategy',
      description: 'We optimize your profiles for maximum visibility, engagement, and follower growth.',
    },
  ];

  const platforms = [
    {
      name: 'Facebook Page Setup & Optimization',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        'Page creation',
        'Category setup',
        'Username customization',
        'Profile + cover branding',
        'About section optimization',
        'Call-to-action button setup',
        'Business info & messaging setup',
      ],
    },
    {
      name: 'Instagram Business Setup',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        'Instagram business account creation',
        'Bio writing + profile optimization',
        'Highlight covers + story setup',
        'Theme-based brand aesthetic',
      ],
    },
    {
      name: 'YouTube Channel Setup',
      color: 'text-red-300',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400/50',
      features: [
        'Banner + profile design',
        'Channel description',
        'Keyword-based metadata',
        'Branding intro/outro (optional)',
      ],
    },
    {
      name: 'TikTok Business Setup',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        'Profile branding',
        'Bio + link setup',
        'Business account optimization',
      ],
    },
    {
      name: 'LinkedIn Business Page',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
      features: [
        'Corporate profile setup',
        'Brand-consistent visuals',
        'Company description writing',
      ],
    },
    {
      name: 'Twitter (X) Business Setup',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
      features: [
        'Professional profile',
        'Header & display branding',
        'Bio + link optimization',
      ],
    },
  ];

  const packages = [
    {
      name: 'Basic Social Setup',
      subtitle: 'Perfect for new businesses',
      price: '$29',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        'Facebook Page Setup',
        'Instagram Business Setup',
        'Profile Picture + Cover Branding',
        'Bio & About Section Optimization',
        'CTA Button Setup',
        'Basic Branding (colors + theme)',
        '24-hour delivery',
        'Email support',
      ],
    },
    {
      name: 'Standard Branding Setup',
      subtitle: 'Best value for small & growing businesses',
      price: '$49',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        'Facebook + Instagram + TikTok or LinkedIn setup',
        'Full profile optimization',
        'Premium Cover Photo + Profile Branding',
        'SEO-optimized bio & description',
        'Highlight Story Icons (5)',
        'Contact Info + CTA Setup',
        'Basic Theme Aesthetic',
        '1-on-1 WhatsApp support',
        '24–48 hour delivery',
      ],
    },
    {
      name: 'Premium Multi-Platform Setup',
      subtitle: 'For brands that want a complete professional identity',
      price: '$149',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        'Facebook + Instagram + TikTok + YouTube + LinkedIn',
        'Full branding kit for all platforms',
        'Premium graphics (covers, banners, highlight icons)',
        'Social media launch package (5–8 posts)',
        'Business category, settings & permissions setup',
        'Messaging automation setup',
        'Keyword-based profile optimization',
        'Multi-platform consistency & theme styling',
        'WhatsApp priority support',
        '24–48 hour fast delivery',
      ],
    },
    {
      name: 'Elite Brand Presence Package',
      subtitle: 'For serious brands, agencies & international businesses',
      price: 'contact us',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
      features: [
        'Complete setup for all major social platforms',
        'Brand identity system applied across all profiles',
        'High-end branded posts (10–15 launch posts)',
        'Animated profile elements (optional)',
        'Hashtag strategy + keyword research',
        'Social media verification guidance (if eligible)',
        'Custom-designed highlight icons (10–15)',
        'Premium bio & storytelling description',
        'Content calendar for first 7 days',
        'Dedicated branding specialist',
        '30-day support after delivery',
      ],
    },
  ];

  const addons = [
    {
      name: 'Additional Post Templates',
      price: '$5–10 each',
    },
    {
      name: 'Reels / TikTok video templates',
      price: '$10–20',
    },
    {
      name: 'Animated Logo Intro for Reels',
      price: '$20',
    },
    {
      name: 'YouTube Thumbnail Kit',
      price: '$10',
    },
    {
      name: 'Social Media Strategy PDF',
      price: '$10–25',
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Premium Branding Quality',
      description: 'Your social profiles will match the level of top brands.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Most setups completed within 24–48 hours.',
    },
    {
      icon: Palette,
      title: 'Consistent Visual Identity',
      description: 'Every platform matches your brand style.',
    },
    {
      icon: Search,
      title: 'SEO & Marketing Optimization',
      description: 'More visibility, more trust, more engagement.',
    },
    {
      icon: Eye,
      title: 'Experienced Designers & Strategists',
      description: 'We know what works for business and branding.',
    },
    {
      icon: Shield,
      title: 'Clear & Transparent Pricing',
      description: 'No hidden fees — just high-quality work.',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Consultation',
      description: 'Discuss your platforms, goals, and brand style.',
    },
    {
      step: '2',
      title: 'Branding & Design Preparation',
      description: 'We create your profile visuals: logos, covers, highlight icons, etc.',
    },
    {
      step: '3',
      title: 'Platform Setup & Optimization',
      description: 'We create or optimize all chosen social accounts.',
    },
    {
      step: '4',
      title: 'Verification Setup (If Eligible)',
      description: 'We guide you with page / account verification processes.',
    },
    {
      step: '5',
      title: 'Final Review & Delivery',
      description: 'Everything is handed over with login instructions.',
    },
    {
      step: '6',
      title: 'Optional Content Pack',
      description: 'We can provide launch posts, reels, or templates.',
    },
  ];

  const stats = [
    { number: '2,000+', label: 'Profiles Setup', icon: Share2, color: 'text-blue-400' },
    { number: '99%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
    { number: '24-48h', label: 'Fast Delivery', icon: Clock, color: 'text-green-400' },
    { number: '6+', label: 'Platforms Supported', icon: Globe, color: 'text-purple-400' },
  ];

  const testimonials = [
    {
      name: 'Lisa Anderson',
      role: 'E-commerce Owner',
      company: 'FashionHub',
      image: '👩‍💼',
      rating: 5,
      text: 'Premium Multi-Platform Setup transformed our social presence! All platforms look cohesive and professional. Our engagement increased by 300%.',
      package: 'Premium Multi-Platform Setup',
    },
    {
      name: 'Robert Taylor',
      role: 'Startup Founder',
      company: 'TechVenture',
      image: '👨‍💼',
      rating: 5,
      text: 'Standard package was perfect. Got Facebook, Instagram, and LinkedIn set up beautifully. Fast delivery and excellent support!',
      package: 'Standard Branding Setup',
    },
    {
      name: 'Amanda White',
      role: 'Small Business Owner',
      company: 'Local Services',
      image: '👩‍💻',
      rating: 5,
      text: 'Basic setup was exactly what I needed. Professional profiles in 24 hours. Highly recommend for new businesses!',
      package: 'Basic Social Setup',
    },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Social Media Setup — Evanio</title>
        <meta name="description" content="Establish a professional social media presence across all major platforms. We create and optimize your Facebook, Instagram, TikTok, and LinkedIn pages with engaging content and proper setup." />
        <meta name="keywords" content="social media setup, social media management, facebook setup, instagram setup, social media optimization" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/20 border-2 border-blue-400/50 rounded-full flex items-center justify-center mb-6">
                <Share2 className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Social Media Setup
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Establish a professional social media presence across all major platforms. We create and optimize your Facebook, Instagram, TikTok, and LinkedIn pages with engaging content and proper setup.
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
              Social Media Setup Services
            </h2>
            
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg text-white/90 mb-4">
                Professional, optimized, and fully branded social profiles that help your business look trustworthy and attract customers.
              </p>
              <p className="text-lg text-white/90 mb-4">
                Your social media is the digital face of your business.
              </p>
              <p className="text-lg text-white/90 mb-4">
                At Evanio, we create polished, high-quality social profiles across all major platforms — ensuring your brand looks consistent, premium, and ready for engagement.
              </p>
              <p className="text-lg text-white/90">
                Whether you're a startup, small business, creator, or global brand, we set you up for success with complete social media branding and optimization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Social Media Setup
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

          {/* Platforms Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Platforms We Setup & Optimize
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <GlassCard
                  key={index}
                  variant="default"
                  className={`p-6 border-2 ${platform.borderColor} ${platform.bgColor}`}
                >
                  <h3 className={`text-xl font-bold ${platform.color} mb-4 text-center`}>{platform.name}</h3>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* What You Get Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What You Get With Evanio Social Setup
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
              Social Media Setup — Premium Pricing Table (Evanio)
            </h2>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Choose the perfect package to establish your professional social media presence. All packages include free consultation.
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

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Social Media Setup?
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
              Social Media Setup Process
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
              Ready to Build Your Social Presence with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let us create beautifully branded social media profiles for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Social Media Setup
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

