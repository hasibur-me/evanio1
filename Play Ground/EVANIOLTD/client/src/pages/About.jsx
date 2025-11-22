import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Rocket, 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Globe,
  Shield,
  Zap,
  CheckCircle2,
  BarChart3,
  Heart,
  Star,
  ArrowRight,
  Play,
  Quote,
  Building2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '10,000+', label: 'Businesses Served', icon: Building2, color: 'text-blue-400' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
    { number: '50+', label: 'Countries Served', icon: Globe, color: 'text-green-400' },
    { number: '24/7', label: 'Support Available', icon: Zap, color: 'text-purple-400' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We listen, adapt, and deliver solutions tailored to your needs.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace innovation and cutting-edge technology to provide you with the best tools and solutions available.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We build lasting relationships through honest communication, transparent pricing, and reliable service delivery.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50'
    },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Evanio was born with a vision to democratize business success' },
    { year: '2021', title: 'First 1,000 Clients', description: 'Reached our first major milestone serving 1,000 businesses' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded services to 50+ countries worldwide' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI automation services for modern businesses' },
    { year: '2024', title: '10,000+ Clients', description: 'Celebrated serving over 10,000 businesses globally' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      image: '👩‍💼',
      rating: 5,
      text: 'Evanio transformed our business. From formation to digital presence, they handled everything with professionalism and expertise.',
    },
    {
      name: 'Michael Chen',
      role: 'Founder',
      company: 'Global Solutions',
      image: '👨‍💻',
      rating: 5,
      text: 'The team at Evanio is exceptional. They made the complex process of business formation simple and stress-free.',
    },
    {
      name: 'Emily Davis',
      role: 'Entrepreneur',
      company: 'Creative Agency',
      image: '👩‍🎨',
      rating: 5,
      text: 'Outstanding service and support. Evanio helped us launch our business faster than we ever imagined possible.',
    },
  ];

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: Target },
    { id: 'vision', label: 'Our Vision', icon: Rocket },
    { id: 'story', label: 'Our Story', icon: Heart },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>About Us - Evanio | Empowering Business Success</title>
        <meta name="description" content="Learn about Evanio - empowering businesses to grow and succeed with comprehensive solutions and exceptional service." />
      </Helmet>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Trusted by 10,000+ Businesses</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Evanio</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Empowering businesses to grow and succeed with comprehensive solutions and exceptional service.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card glass key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-white/70">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Mission/Vision/Story Tabs */}
          <GlassCard variant="hero" className="p-8 md:p-12 lg:p-16 mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white/80 border border-white/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="max-w-4xl mx-auto">
              {activeTab === 'mission' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-400/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-blue-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
                    At Evanio, we're dedicated to helping businesses launch, grow, and thrive in today's competitive market. We provide end-to-end solutions that streamline your business operations and accelerate your success.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Our mission is to make business formation, digital transformation, and growth accessible to everyone, regardless of their technical expertise or business background. We believe every entrepreneur deserves access to world-class business services.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-purple-500/20 border-2 border-purple-400/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-purple-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision</h2>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
                    To become the world's most trusted partner for business success, empowering millions of entrepreneurs and businesses to achieve their dreams.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    We envision a future where starting and growing a business is simple, accessible, and supported by cutting-edge technology and expert guidance. Every business, regardless of size or location, should have access to the tools and expertise needed to succeed.
                  </p>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-pink-500/20 border-2 border-pink-400/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-pink-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
                  <div className="text-left space-y-4 text-white/90 leading-relaxed">
                    <p className="text-lg">
                      Evanio was founded with a simple yet powerful vision: to democratize business success. We recognized that starting and growing a business shouldn't be complicated or overwhelming.
                    </p>
                    <p>
                      Since our inception, we've helped thousands of businesses navigate the complexities of business formation, digital transformation, and growth. Our team of experts combines years of experience with a passion for helping others succeed.
                    </p>
                    <p>
                      Today, Evanio stands as a trusted partner for businesses worldwide, offering comprehensive solutions that range from legal business formation to cutting-edge digital services. We're committed to continuing our mission of empowering entrepreneurs and businesses to achieve their full potential.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className={`w-14 h-14 ${value.bgColor} ${value.borderColor} border-2 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-white/80 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Journey Timeline */}
          <GlassCard variant="cta" className="p-8 md:p-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:text-right">
                      {index % 2 === 0 && (
                        <Card glass className="p-6 inline-block">
                          <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                          <p className="text-white/80">{milestone.description}</p>
                        </Card>
                      )}
                    </div>
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white/20 flex-shrink-0 z-10"></div>
                    <div className="flex-1 md:text-left">
                      {index % 2 !== 0 && (
                        <Card glass className="p-6 inline-block">
                          <div className="text-2xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                          <p className="text-white/80">{milestone.description}</p>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
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
                      <div className="text-xs text-white/60 mt-1">{testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Business Journey?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses that trust Evanio for their business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-medium bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  Contact Us
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
