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
  TrendingUp,
  Search,
  Share2,
  FileText,
  BarChart3,
  Mail,
  Image,
  Zap,
  Award,
  Shield,
  Clock,
  Rocket,
  Eye,
  Globe,
  Briefcase,
  Store,
  Code,
  Users,
  GraduationCap,
  Home,
  ShoppingBag,
  Star,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function DigitalMarketing() {
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

  const whatWeOffer = [
    {
      icon: TrendingUp,
      title: 'Performance Marketing (Paid Ads)',
      description: 'Facebook, Instagram, TikTok, Google, YouTube & LinkedIn ads optimized for conversions.',
    },
    {
      icon: Search,
      title: 'SEO & Content Optimization',
      description: 'Technical SEO, keyword strategy, content planning, on-page optimization & ranking improvements.',
    },
    {
      icon: Share2,
      title: 'Social Media Growth',
      description: 'Content ideas, branding, posting structure, engagement strategy & growth playbooks.',
    },
    {
      icon: FileText,
      title: 'Landing Page Conversion Optimization (CRO)',
      description: 'Design, copywriting, A/B testing, heatmaps & funnel improvements.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Tracking Setup',
      description: 'GA4, Pixel, Tag Manager, UTM tracking, dashboards & advanced reporting.',
    },
    {
      icon: Mail,
      title: 'Email & Automation Systems',
      description: 'Klaviyo, Mailchimp, HubSpot, drip sequences, remarketing flows & retention strategy.',
    },
    {
      icon: Image,
      title: 'Creative Production',
      description: 'Ad creatives, short videos, motion graphics, thumbnails & conversion-first visuals.',
    },
    {
      icon: Zap,
      title: 'Full-Funnel Growth Strategy',
      description: 'End-to-end buyer journey mapping for predictable monthly growth.',
    },
    {
      icon: Rocket,
      title: 'Growth Consulting & Strategy',
      description: 'Strategic guidance, market analysis, competitive research & monthly growth planning.',
    },
  ];

  const platforms = [
    {
      name: 'Facebook Ads Manager',
      icon: Share2,
    },
    {
      name: 'Instagram Ads',
      icon: Image,
    },
    {
      name: 'TikTok Ads',
      icon: Video,
    },
    {
      name: 'Google Ads / YouTube Ads',
      icon: TrendingUp,
    },
    {
      name: 'LinkedIn Ads',
      icon: Briefcase,
    },
    {
      name: 'Shopify & WooCommerce marketing',
      icon: Store,
    },
    {
      name: 'Klaviyo / Mailchimp email systems',
      icon: Mail,
    },
    {
      name: 'Google Analytics 4',
      icon: BarChart3,
    },
    {
      name: 'Hotjar',
      icon: Eye,
    },
    {
      name: 'Zapier / Make automations',
      icon: Zap,
    },
  ];

  const industries = [
    {
      name: 'E-commerce & retail',
      icon: ShoppingBag,
    },
    {
      name: 'SaaS / software',
      icon: Code,
    },
    {
      name: 'Agencies & service businesses',
      icon: Briefcase,
    },
    {
      name: 'Local businesses',
      icon: Home,
    },
    {
      name: 'Coaches & online educators',
      icon: GraduationCap,
    },
    {
      name: 'Real estate',
      icon: Home,
    },
    {
      name: 'Dropshipping',
      icon: Store,
    },
    {
      name: 'Personal brands & influencers',
      icon: Star,
    },
  ];

  const whyChooseUs = [
    {
      title: 'Data-driven decisions (not guessing)',
      icon: BarChart3,
    },
    {
      title: 'High-converting creatives & funnels',
      icon: TrendingUp,
    },
    {
      title: 'Expert team across ads, SEO & CRO',
      icon: Award,
    },
    {
      title: 'Transparent pricing',
      icon: Shield,
    },
    {
      title: 'Weekly reporting & analytics',
      icon: FileText,
    },
    {
      title: 'Fast execution & continuous optimization',
      icon: Zap,
    },
    {
      title: 'Proven results for global brands',
      icon: Globe,
    },
    {
      title: 'Custom strategies for your industry',
      icon: Award,
    },
    {
      title: 'Ongoing optimization & scaling',
      icon: TrendingUp,
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Strategy Call',
      description: 'Understand your brand, audience and KPIs.',
    },
    {
      step: '2',
      title: 'Audit & Research',
      description: 'We audit your website, ads, SEO and competitors.',
    },
    {
      step: '3',
      title: 'Full Growth Plan',
      description: 'Channels, content, campaigns & funnel structure.',
    },
    {
      step: '4',
      title: 'Setup & Launch',
      description: 'Tracking, campaigns, creatives, landing pages.',
    },
    {
      step: '5',
      title: 'Optimization & Scaling',
      description: 'Daily improvements, new creatives, audience tests, budget scaling.',
    },
    {
      step: '6',
      title: 'Reporting & Growth Review',
      description: 'Weekly reports, analytics dashboards, next-step roadmap.',
    },
  ];

  const packages = [
    {
      name: 'Starter – Growth Kickstart',
      price: '$199 / month',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        '2 ad platforms',
        'Basic keyword & audience research',
        '10 creatives',
        'Monthly reporting',
        'Landing page review',
      ],
    },
    {
      name: 'Pro – Scalable Growth',
      price: '$499 / month',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        '3 platforms (Meta + Google + TikTok)',
        'Advanced targeting',
        'CRO audit',
        'Weekly reporting',
        '25 creatives',
        'Email automation setup',
        'Scaling strategy',
      ],
    },
    {
      name: 'Elite – Full-Funnel Engine',
      price: '$999 / month',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        'Multi-channel growth system',
        'Custom landing pages',
        'Advanced analytics dashboard',
        'Funnel building & optimization',
        '40+ creatives per month',
        'Weekly strategy calls',
        'Premium support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How fast can we start?',
      answer: 'We can launch your campaigns within 48–72 hours after onboarding.',
    },
    {
      question: 'Do you offer one-time projects?',
      answer: 'Yes — but monthly plans deliver the best results.',
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes — Evanio works with global brands in any country.',
    },
    {
      question: 'Do you handle ad spend?',
      answer: 'You pay the platform directly; we manage the campaigns.',
    },
  ];

  const stats = [
    { number: '300+', label: 'Campaigns Managed', icon: TrendingUp, color: 'text-blue-400' },
    { number: '250%', label: 'Avg. ROI Increase', icon: BarChart3, color: 'text-green-400' },
    { number: '48-72h', label: 'Quick Launch', icon: Clock, color: 'text-yellow-400' },
    { number: '10+', label: 'Platforms Supported', icon: Globe, color: 'text-purple-400' },
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'E-commerce Director',
      company: 'RetailPlus',
      image: '👩‍💼',
      rating: 5,
      text: 'Elite package transformed our marketing! Revenue increased by 400% in 3 months. The team is incredibly strategic and results-driven.',
      package: 'Elite – Full-Funnel Engine',
    },
    {
      name: 'Mark Thompson',
      role: 'SaaS Founder',
      company: 'CloudSolutions',
      image: '👨‍💼',
      rating: 5,
      text: 'Pro package is perfect for scaling. Multi-platform campaigns, weekly reporting, and continuous optimization. Highly recommend!',
      package: 'Pro – Scalable Growth',
    },
    {
      name: 'Rachel Green',
      role: 'Small Business Owner',
      company: 'Local Services Co',
      image: '👩‍💻',
      rating: 5,
      text: 'Starter package helped us launch our first campaigns successfully. Great value and excellent support throughout!',
      package: 'Starter – Growth Kickstart',
    },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Digital Marketing — Evanio</title>
        <meta name="description" content="Drive growth with our comprehensive digital marketing services. We handle ad campaigns, SEO optimization, content strategy, social media marketing, and provide ongoing growth support." />
        <meta name="keywords" content="digital marketing, marketing services, SEO, paid ads, social media marketing, content marketing" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/20 border-2 border-blue-400/50 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Digital Marketing
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Drive growth with our comprehensive digital marketing services. We handle ad campaigns, SEO optimization, content strategy, social media marketing, and provide ongoing growth support.
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
              Digital Marketing Services
            </h2>
            
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg text-white/90 mb-4">
                Data-driven marketing that grows your brand with paid ads, SEO, content, analytics & creative strategy.
              </p>
              <p className="text-lg text-white/90 mb-4">
                At Evanio, we help businesses attract customers, increase sales, and scale consistently using powerful digital marketing systems.
              </p>
              <p className="text-lg text-white/90">
                From running high-performing ads to building full marketing funnels — we handle everything for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Your Marketing Strategy
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

          {/* What We Offer Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeOffer.map((item, index) => {
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

          {/* Packages Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Digital Marketing Packages
            </h2>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Monthly subscription plans designed to scale your business. All plans include free strategy consultation and ongoing optimization.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <GlassCard
                  key={index}
                  variant="default"
                  className={`p-6 text-center border-2 ${pkg.borderColor} ${pkg.bgColor} relative flex flex-col`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold ${pkg.color} mb-2`}>{pkg.name}</h3>
                  <div className={`text-4xl md:text-5xl font-bold ${pkg.color} mb-2`}>
                    {pkg.price}
                  </div>
                  <div className="text-white/60 text-sm mb-6">Monthly subscription</div>
                  <ul className="space-y-3 text-left mb-6 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-center gap-2 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/checkout?service=${encodeURIComponent('Digital Marketing')}&serviceSlug=digital-marketing&package=${encodeURIComponent(pkg.name)}&packagePrice=${encodeURIComponent(pkg.price.match(/[\d.]+/g)?.[0] || '0')}`}
                    className="mt-auto"
                  >
                    <Button
                      size="lg"
                      className={`w-full rounded-full px-6 py-3 font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
                        index === 0 
                          ? 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-600/90' 
                          : index === 1
                          ? 'bg-green-600/80 border-green-500/50 hover:bg-green-600/90'
                          : 'bg-orange-600/80 border-orange-500/50 hover:bg-orange-600/90'
                      }`}
                    >
                      Subscribe Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* Platforms Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Platforms We Work With
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={index}
                    className="p-4 text-center backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">{platform.name}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Industries Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Industries We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={index}
                    className="p-4 text-center backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                  >
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">{industry.name}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Process Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Digital Marketing Process
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

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for Marketing?
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
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* FAQ Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              FAQ
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <GlassCard key={index} variant="default" className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Q: {faq.question}</h3>
                  <p className="text-white/80 leading-relaxed">A: {faq.answer}</p>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* CTA Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's build a complete digital marketing system that brings real customers and real growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Your Marketing Strategy
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

