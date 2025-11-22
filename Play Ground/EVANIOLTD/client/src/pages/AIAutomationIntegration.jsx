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
  Bot,
  Zap,
  MessageSquare,
  Code,
  Layers,
  ShoppingBag,
  FileText,
  Sparkles,
  Award,
  Rocket,
  Eye,
  Briefcase,
  Home,
  Store,
  Heart,
  Building2,
  Users,
  Server,
  BarChart,
  Star,
  Quote,
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function AIAutomationIntegration() {
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
      icon: Zap,
      title: 'AI Workflow Automation',
      description: 'Automate repetitive tasks like messaging, data entry, invoicing, customer support & order handling.',
    },
    {
      icon: Bot,
      title: 'Chatbot & AI Assistant Setup',
      description: 'AI-powered chat, customer support, lead generation & FAQ automation for websites & WhatsApp.',
    },
    {
      icon: Code,
      title: 'OpenAI & GPT Integration',
      description: 'Custom AI features for your website, dashboard, or SaaS — text generation, summarization, chat, AI tools.',
    },
    {
      icon: Layers,
      title: 'Business Process Automation',
      description: 'Connect your apps with smart workflows: CRM, Google Sheets, email, payments & notifications.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp & Messenger Automation',
      description: 'AI message replies, lead capture flows, appointment booking & auto-response systems.',
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce Automation',
      description: 'Order updates, cart recovery, notifications, customer tagging, and product recommendations.',
    },
    {
      icon: FileText,
      title: 'AI Content Automation',
      description: 'Automatic content creation for social media, blogs, and product descriptions.',
    },
    {
      icon: Sparkles,
      title: 'Custom AI Tools for Your Business',
      description: 'We build personalized AI features like: AI calculators, AI search, AI recommendations, AI form assistants, Smart dashboards.',
    },
    {
      icon: BarChart,
      title: 'AI Analytics & Performance Tracking',
      description: 'Automated data analysis, reporting, performance monitoring, and insights generation for business intelligence.',
    },
  ];

  const toolsPlatforms = {
    ai: [
      'OpenAI (ChatGPT API)',
      'Claude API',
      'Gemini API',
      'Llama Models',
      'Microsoft Copilot integrations',
    ],
    automation: [
      'Zapier',
      'Make.com',
      'n8n',
      'Airtable Automations',
    ],
    business: [
      'Shopify',
      'WordPress',
      'Webflow',
      'Notion',
      'Slack',
      'WhatsApp API',
    ],
    backend: [
      'Node.js',
      'Express',
      'Python AI workflows',
      'MongoDB',
    ],
  };

  const industries = [
    {
      name: 'E-commerce',
      icon: ShoppingBag,
    },
    {
      name: 'Agencies',
      icon: Briefcase,
    },
    {
      name: 'SaaS & Software',
      icon: Code,
    },
    {
      name: 'Real Estate',
      icon: Home,
    },
    {
      name: 'Service Providers',
      icon: Users,
    },
    {
      name: 'Finance & Consulting',
      icon: Building2,
    },
    {
      name: 'Healthcare & Clinics',
      icon: Heart,
    },
    {
      name: 'Local Businesses',
      icon: Store,
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Full custom solutions — not templates',
      description: 'We build personalized automation tailored to your business processes.',
    },
    {
      icon: Zap,
      title: 'Save time, reduce workload',
      description: 'Eliminate 30–70% of repetitive work instantly.',
    },
    {
      icon: Eye,
      title: 'Increase customer satisfaction',
      description: 'Faster replies, smoother workflows, better experience.',
    },
    {
      icon: Rocket,
      title: 'Scalable systems',
      description: 'Automations grow as your business grows.',
    },
    {
      icon: Users,
      title: 'Expert team',
      description: 'AI engineers + automation specialists working together.',
    },
    {
      icon: Phone,
      title: 'Free consultancy before starting',
      description: 'Choose the right automations with our guidance.',
    },
  ];

  const packages = [
    {
      name: 'Starter Automation Pack',
      price: '$149',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      features: [
        '1–2 automations',
        'Simple workflows (email, sheets, notifications)',
        'Basic chatbot setup',
        '24–48 hour delivery',
      ],
    },
    {
      name: 'Standard Automation System',
      price: '$199',
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      features: [
        'Multi-step workflows',
        'CRM integration',
        'WhatsApp automation',
        'AI chatbot + lead capture',
        '5–10 automations',
        'Dashboard setup',
        'WhatsApp support',
      ],
    },
    {
      name: 'Premium AI Automation Suite',
      price: '$499',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      features: [
        'Custom AI tools (ChatGPT-powered)',
        'Advanced automation flows',
        'Full e-commerce automations',
        'AI assistants for website or dashboard',
        'Multi-platform integrations',
        'Priority support',
        '30-day optimization',
      ],
    },
    {
      name: 'Enterprise AI Integration',
      price: 'contact us',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
      features: [
        'AI systems for SaaS platforms',
        'Full automation of workflows',
        'Business process mapping',
        'Custom-coded AI features',
        'Dedicated automation engineer',
        '60-day support & training',
      ],
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Free Discovery Call',
      description: 'We understand your business, tasks, and goals.',
    },
    {
      step: '2',
      title: 'Automation Blueprint',
      description: 'We design a roadmap of what can be automated.',
    },
    {
      step: '3',
      title: 'Build & Integration',
      description: 'AI systems, automations, workflows, dashboards.',
    },
    {
      step: '4',
      title: 'Testing',
      description: 'We test scenarios, responses, triggers & results.',
    },
    {
      step: '5',
      title: 'Launch & Training',
      description: 'Your team learns how to use the system.',
    },
    {
      step: '6',
      title: 'Optimization',
      description: 'We refine the automation for maximum efficiency.',
    },
  ];

  const stats = [
    { number: '400+', label: 'Automations Built', icon: Zap, color: 'text-blue-400' },
    { number: '70%', label: 'Time Saved', icon: Clock, color: 'text-green-400' },
    { number: '24-48h', label: 'Fast Delivery', icon: Rocket, color: 'text-yellow-400' },
    { number: '15+', label: 'AI Tools Integrated', icon: Bot, color: 'text-purple-400' },
  ];

  const testimonials = [
    {
      name: 'Thomas Brown',
      role: 'E-commerce Owner',
      company: 'ShopSmart',
      image: '👨‍💼',
      rating: 5,
      text: 'Premium AI Automation Suite saved us 20+ hours per week! The custom ChatGPT integration and workflow automations are game-changers.',
      package: 'Premium AI Automation Suite',
    },
    {
      name: 'Sophie Lee',
      role: 'Agency Owner',
      company: 'Creative Agency',
      image: '👩‍💼',
      rating: 5,
      text: 'Standard package automated our entire client onboarding process. WhatsApp automation and CRM integration work flawlessly!',
      package: 'Standard Automation System',
    },
    {
      name: 'Michael Chen',
      role: 'SaaS Founder',
      company: 'TechStart',
      image: '👨‍💻',
      rating: 5,
      text: 'Starter pack was perfect for our needs. Simple automations that work perfectly. Great value and fast delivery!',
      package: 'Starter Automation Pack',
    },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>AI Automation & Integration — Evanio</title>
        <meta name="description" content="Transform your business operations with AI automation and intelligent workflows. We help you integrate AI tools, automate repetitive tasks, and build intelligent systems that save time and increase efficiency." />
        <meta name="keywords" content="AI automation, AI integration, business automation, AI tools, workflow automation, chatbot setup" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/20 border-2 border-blue-400/50 rounded-full flex items-center justify-center mb-6">
                <Bot className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                AI Automation & Integration
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Transform your business operations with AI automation and intelligent workflows. We help you integrate AI tools, automate repetitive tasks, and build intelligent systems that save time and increase efficiency.
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
              AI Automation & Integration Services
            </h2>
            
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg text-white/90 mb-4">
                Boost efficiency, simplify operations, and grow faster with smart AI-powered systems.
              </p>
              <p className="text-lg text-white/90 mb-4">
                At Evanio, we help businesses automate repetitive tasks, integrate AI tools, and build intelligent workflows that save time, reduce manual work, and increase productivity.
              </p>
              <p className="text-lg text-white/90">
                Whether you're a startup, agency, e-commerce brand, or enterprise — we create automation systems tailored to your business needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start AI Integration
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

          {/* Tools & Platforms Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Tools & Platforms We Work With
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-400" />
                  AI Platforms
                </h3>
                <ul className="space-y-2">
                  {toolsPlatforms.ai.map((tool, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Automation Tools
                </h3>
                <ul className="space-y-2">
                  {toolsPlatforms.automation.map((tool, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-400" />
                  Business Tools
                </h3>
                <ul className="space-y-2">
                  {toolsPlatforms.business.map((tool, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  Custom Backend
                </h3>
                <ul className="space-y-2">
                  {toolsPlatforms.backend.map((tool, index) => (
                    <li key={index} className="text-white/80 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
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

          {/* Why Choose Evanio Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Choose Evanio for AI Automation?
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
              AI Automation Packages
            </h2>
            <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
              Choose the perfect automation package for your business. All packages include free consultation and expert implementation.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <h3 className={`text-xl font-bold ${pkg.color} mb-2`}>{pkg.name}</h3>
                  <div className={`text-3xl md:text-4xl font-bold ${pkg.color} mb-2`}>
                    {pkg.price}
                  </div>
                  {!pkg.price.toLowerCase().includes('contact') && (
                    <div className="text-white/60 text-xs mb-6">One-time payment</div>
                  )}
                  <ul className="space-y-3 text-left mb-6 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {pkg.price.toLowerCase().includes('contact') ? (
                    <Link to="/contact" className="mt-auto">
                      <Button
                        size="lg"
                        className={`w-full rounded-full px-4 py-2.5 text-sm font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
                          index === 3
                            ? 'bg-yellow-600/80 border-yellow-500/50 hover:bg-yellow-600/90'
                            : 'bg-blue-600/80 border-blue-500/50 hover:bg-blue-600/90'
                        }`}
                      >
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to={`/checkout?service=${encodeURIComponent('AI Automation & Integration')}&serviceSlug=ai-automation-integration&package=${encodeURIComponent(pkg.name)}&packagePrice=${encodeURIComponent(pkg.price.match(/[\d.]+/g)?.[0] || '0')}`}
                      className="mt-auto"
                    >
                      <Button
                        size="lg"
                        className={`w-full rounded-full px-4 py-2.5 text-sm font-medium backdrop-blur-sm border text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap transition-colors ${
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
                      </Button>
                    </Link>
                  )}
                </GlassCard>
              ))}
            </div>
          </GlassCard>

          {/* Process Section */}
          <GlassCard variant="default" className="mb-12 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our AI Integration Process
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
              Ready to Automate Your Business with Evanio?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's build powerful AI automation systems that save time and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/service-request">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start AI Integration
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

