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
  Globe,
  Monitor,
  Smartphone,
  Zap,
  Layout,
  Plug,
  Shield,
  Search,
  Palette,
  Rocket,
  Code,
  Database,
  Store,
  CreditCard,
  Server,
  Sparkles,
  BarChart3,
  Layers,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  Star,
  CheckCircle2,
  Quote,
  Users,
  Grid3x3,
  Maximize2,
  ExternalLink,
  TestTube,
  Ship,
  Activity,
  Lock
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function WebsiteDevelopment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);

  const stats = [
    { number: '2,000+', label: 'Websites Built', icon: Monitor, color: 'text-blue-400' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
    { number: '2-4 Weeks', label: 'Average Delivery', icon: Clock, color: 'text-green-400' },
    { number: '24/7', label: 'Support Available', icon: Zap, color: 'text-purple-400' },
  ];

  const packages = [
    {
      name: 'Starter Website',
      price: 999,
      originalPrice: 1299,
      popular: false,
      duration: '2-3 weeks',
      features: [
        'Up to 5 pages',
        'Responsive design (mobile, tablet, desktop)',
        'Basic SEO optimization',
        'Contact form integration',
        'Social media integration',
        'Basic analytics setup',
        '1 revision round',
        'Email support',
      ],
    },
    {
      name: 'Professional Website',
      price: 1999,
      originalPrice: 2499,
      popular: true,
      duration: '3-4 weeks',
      features: [
        'Everything in Starter',
        'Up to 10 pages',
        'Advanced SEO optimization',
        'Custom animations & interactions',
        'E-commerce integration (up to 20 products)',
        'Blog system',
        'Multi-language support',
        'Advanced analytics & tracking',
        '3 revision rounds',
        'Priority email & phone support',
        'Content management system (CMS)',
      ],
    },
    {
      name: 'Enterprise Website',
      price: 3999,
      originalPrice: 4999,
      popular: false,
      duration: '4-6 weeks',
      features: [
        'Everything in Professional',
        'Unlimited pages',
        'Custom web application features',
        'Advanced e-commerce (unlimited products)',
        'User authentication & accounts',
        'Payment gateway integration',
        'API integrations',
        'Custom dashboard/portal',
        'Unlimited revisions',
        'Dedicated project manager',
        '24/7 priority support',
        '6 months free maintenance',
        'Performance optimization',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'David Wilson',
      role: 'E-commerce Owner',
      company: 'TechStore',
      image: '👨‍💼',
      rating: 5,
      text: 'The Professional package was perfect for our needs. The website looks amazing and conversion rates increased by 40%!',
      package: 'Professional',
    },
    {
      name: 'Lisa Anderson',
      role: 'SaaS Founder',
      company: 'CloudApp',
      image: '👩‍💻',
      rating: 5,
      text: 'Enterprise package delivered exactly what we needed. The custom dashboard and integrations work flawlessly.',
      package: 'Enterprise',
    },
    {
      name: 'James Brown',
      role: 'Agency Owner',
      company: 'Creative Agency',
      image: '👨‍🎨',
      rating: 5,
      text: 'Starter package was great value. Fast delivery and the website looks professional. Highly recommend!',
      package: 'Starter',
    },
  ];

  const benefits = [
    {
      icon: Palette,
      title: 'Premium Custom Design',
      description: 'A modern, clean, professional look tailored to your brand identity.',
      color: 'text-blue-400'
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive on All Devices',
      description: 'Perfect on desktop, tablet, and mobile — no compromises.',
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: 'High-Speed Performance',
      description: 'Optimized for fast loading, smooth browsing, and strong SEO results.',
      color: 'text-yellow-400'
    },
    {
      icon: Layout,
      title: 'Business-Ready Page Setup',
      description: 'Home • About • Services • Portfolio • Pricing • Contact (or any custom pages you need).',
      color: 'text-purple-400'
    },
    {
      icon: Plug,
      title: 'Advanced Integrations',
      description: 'Analytics, CRM, chat support, appointment booking, automation, AI tools & more.',
      color: 'text-pink-400'
    },
    {
      icon: Shield,
      title: 'Secure, Stable Technology',
      description: 'Built using the latest frameworks and best development practices.',
      color: 'text-orange-400'
    },
    {
      icon: Search,
      title: 'SEO-Optimized Infrastructure',
      description: 'Better ranking potential with optimized metadata, structure, and loading speed.',
      color: 'text-indigo-400'
    },
    {
      icon: Phone,
      title: 'Free Pre-Project Consultancy',
      description: 'Phone, WhatsApp, or Video Call — completely free.',
      color: 'text-cyan-400'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Reach global audiences with multilingual website capabilities.',
      color: 'text-teal-400'
    },
  ];

  const websiteTypes = [
    {
      icon: Briefcase,
      title: 'Business Websites',
      description: 'Perfect for companies, agencies, and service providers.',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
    },
    {
      icon: Store,
      title: 'E-commerce Stores',
      description: 'High-converting online stores with secure payments & cart systems.',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
    },
    {
      icon: Rocket,
      title: 'Landing Pages / Sales Funnels',
      description: 'Designed to convert traffic from ads and campaigns.',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
    },
    {
      icon: FileText,
      title: 'Portfolio Websites',
      description: 'For creators, professionals, influencers & designers.',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
    },
    {
      icon: Layers,
      title: 'SaaS / App Websites',
      description: 'Clean UI/UX built for software platforms and tech startups.',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
    },
    {
      icon: Code,
      title: 'Custom Web Platforms',
      description: 'Dashboards, portals, membership sites & advanced systems.',
      color: 'text-indigo-300',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-400/50',
    },
  ];

  const technologies = {
    frontend: [
      'React', 'Next.js', 'Tailwind CSS', 'JavaScript/TypeScript', 'Vue.js'
    ],
    backend: [
      'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Firebase', 'Supabase'
    ],
    cms: [
      'WordPress', 'Shopify', 'Webflow', 'Wix', 'Framer', 'Ghost CMS'
    ],
    ecommerce: [
      'Shopify', 'WooCommerce', 'BigCommerce', 'Custom React Stores', 
      'Stripe', 'PayPal', 'Apple Pay', 'Google Pay'
    ],
    hosting: [
      'Vercel', 'Netlify', 'Cloudflare', 'AWS', 'DigitalOcean'
    ],
    ai: [
      'OpenAI', 'ChatGPT Assistants', 'Zapier', 'Make.com'
    ],
    marketing: [
      'Google Analytics', 'Meta Pixel', 'Tag Manager', 'SEO Tools'
    ],
    branding: [
      'Figma', 'Adobe XD', 'Illustrator', 'Canva Pro'
    ],
    testing: [
      'Jest', 'Cypress', 'Playwright', 'Testing Library', 'Vitest'
    ],
    deployment: [
      'Docker', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'GitLab CI'
    ],
    monitoring: [
      'Sentry', 'LogRocket', 'New Relic', 'Datadog', 'Performance Monitoring'
    ],
    security: [
      'SSL/TLS', 'OAuth 2.0', 'JWT', 'Rate Limiting', 'Security Headers'
    ],
    design: [
      'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'
    ],
    analytics: [
      'Google Analytics 4', 'Mixpanel', 'Amplitude', 'Hotjar', 'FullStory'
    ],
  };

  const whyChooseUs = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'World-class UI/UX that builds trust instantly.',
      color: 'text-blue-400'
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Project-ready timelines without sacrificing quality.',
      color: 'text-green-400'
    },
    {
      icon: Phone,
      title: 'Free Expert Consultation',
      description: 'We guide you before starting — 100% free.',
      color: 'text-yellow-400'
    },
    {
      icon: CreditCard,
      title: 'Transparent Pricing',
      description: 'Clear packages. No hidden fees.',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: 'Lifetime Support Available',
      description: 'Maintenance, updates, improvements — anytime you need.',
      color: 'text-pink-400'
    },
    {
      icon: TrendingUp,
      title: 'Growth-Focused Development',
      description: 'Scalable solutions designed to grow with your business needs.',
      color: 'text-orange-400'
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Consultation',
      description: 'Phone, WhatsApp, or Video Call.',
      icon: Phone,
    },
    {
      step: '2',
      title: 'Planning & Wireframe',
      description: 'We structure your site based on goals.',
      icon: FileText,
    },
    {
      step: '3',
      title: 'UI/UX Design',
      description: 'Beautiful and modern layouts tailored to your brand.',
      icon: Palette,
    },
    {
      step: '4',
      title: 'Development',
      description: 'Fully functional website built with the best tools.',
      icon: Code,
    },
    {
      step: '5',
      title: 'Testing & Optimization',
      description: 'Speed, SEO, mobile responsiveness, security.',
      icon: Shield,
    },
    {
      step: '6',
      title: 'Launch',
      description: 'Your website goes live — fast, secure, and ready to scale.',
      icon: Rocket,
    },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop',
      description: 'Modern online store with advanced product management',
      url: '#',
      technologies: ['React', 'Node.js', 'Stripe'],
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'SaaS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Clean and intuitive dashboard for SaaS platform',
      url: '#',
      technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    },
    {
      id: 3,
      title: 'Business Website',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      description: 'Professional corporate website with CMS',
      url: '#',
      technologies: ['WordPress', 'Custom Theme'],
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'Portfolio',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      description: 'Creative portfolio with smooth animations',
      url: '#',
      technologies: ['React', 'Framer Motion'],
    },
    {
      id: 5,
      title: 'Landing Page',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop',
      description: 'High-converting landing page for product launch',
      url: '#',
      technologies: ['Next.js', 'A/B Testing'],
    },
    {
      id: 6,
      title: 'Web Application',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Custom web application with user authentication',
      url: '#',
      technologies: ['React', 'MongoDB', 'Express'],
    },
  ];

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    const checkoutUrl = `/checkout?service=Website Development&serviceSlug=website-development&package=${pkg.name}&packagePrice=${pkg.price}`;
    navigate(checkoutUrl);
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Website Development — Evanio | Premium Web Development Services</title>
        <meta name="description" content="Modern, Fast & High-Converting Websites Built for Brands That Want to Grow. Professional web development services with premium quality, fast delivery, and lifetime support." />
        <meta name="keywords" content="website development, web design, custom websites, e-commerce development, responsive websites, modern websites" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">2,000+ Websites Built Successfully</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Website Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Premium Web Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
              Modern, Fast & High-Converting Websites Built for Brands That Want to Grow
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
                Choose Your Website Package
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Select the perfect package for your business needs. All packages include premium design and expert development.
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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

          {/* What You Get Section */}
          <GlassCard variant="cta" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What You Get with Evanio Website Development
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

          {/* Types of Websites Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Types of Websites We Build
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={index}
                    glass
                    className={`p-6 text-center border-2 ${type.borderColor} ${type.bgColor} hover:scale-105 transition-transform duration-300`}
                  >
                    <div className={`w-16 h-16 ${type.bgColor} ${type.borderColor} border-2 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${type.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                    <p className="text-white/80">{type.description}</p>
                  </Card>
                );
              })}
            </div>
          </GlassCard>

          {/* Tools & Technologies Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Tools & Technologies We Use
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Frontend
                </h3>
                <ul className="space-y-2">
                  {technologies.frontend.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Backend
                </h3>
                <ul className="space-y-2">
                  {technologies.backend.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-green-400" />
                  CMS Platforms
                </h3>
                <ul className="space-y-2">
                  {technologies.cms.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Store className="w-5 h-5 text-orange-400" />
                  E-commerce
                </h3>
                <ul className="space-y-2">
                  {technologies.ecommerce.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  Hosting
                </h3>
                <ul className="space-y-2">
                  {technologies.hosting.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  AI & Automation
                </h3>
                <ul className="space-y-2">
                  {technologies.ai.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-yellow-400" />
                  Marketing
                </h3>
                <ul className="space-y-2">
                  {technologies.marketing.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-400" />
                  Branding
                </h3>
                <ul className="space-y-2">
                  {technologies.branding.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-teal-400" />
                  Testing
                </h3>
                <ul className="space-y-2">
                  {technologies.testing.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-blue-300" />
                  Deployment
                </h3>
                <ul className="space-y-2">
                  {technologies.deployment.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-400" />
                  Monitoring
                </h3>
                <ul className="space-y-2">
                  {technologies.monitoring.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-300" />
                  Security
                </h3>
                <ul className="space-y-2">
                  {technologies.security.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-rose-400" />
                  Design Tools
                </h3>
                <ul className="space-y-2">
                  {technologies.design.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Analytics
                </h3>
                <ul className="space-y-2">
                  {technologies.analytics.map((tech, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Web Development?
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

          {/* Portfolio Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Our Portfolio
                </h2>
                <p className="text-white/80">Explore our recent website projects</p>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs">{item.category}</span>
                          <Maximize2 className="w-4 h-4 text-white/80" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-blue-500/30 border border-blue-400/50 rounded text-blue-300 text-xs">
                              {tech}
                            </span>
                          ))}
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
                className="relative max-w-5xl w-full bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPortfolioItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  ×
                </button>
                <img
                  src={selectedPortfolioItem.image}
                  alt={selectedPortfolioItem.title}
                  className="w-full h-auto rounded-xl mb-4"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(selectedPortfolioItem.title)}`;
                  }}
                />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedPortfolioItem.title}</h3>
                    <p className="text-white/80 mb-4">{selectedPortfolioItem.description}</p>
                  </div>
                  {selectedPortfolioItem.url && (
                    <a
                      href={selectedPortfolioItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600/90 rounded-lg text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-blue-300 text-sm">
                    {selectedPortfolioItem.category}
                  </span>
                  {selectedPortfolioItem.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Process Section */}
          <GlassCard variant="default" className="mb-16 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Web Development Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card glass className="p-6 h-full border-2 border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
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

          {/* Final CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Your Website with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's create a modern, high-performance website that grows your business.
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
