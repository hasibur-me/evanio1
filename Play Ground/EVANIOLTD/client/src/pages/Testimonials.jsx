import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Star, Quote, Play, Award, TrendingUp, Users, CheckCircle2, ArrowRight, Filter, Search, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart Inc.',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'Business Formation',
    location: 'New York, USA',
    date: '2024-01-15',
    testimonial: 'Evanio made starting my business incredibly smooth. The team was professional, responsive, and handled everything from formation to payment setup. I couldn\'t be happier!',
    video: null,
    caseStudy: {
      title: 'From Idea to Launch in 30 Days',
      challenge: 'Needed to form a corporation quickly to secure funding',
      solution: 'Complete business formation package with expedited processing',
      results: [
        'Corporation formed in 2 business days',
        'EIN obtained within 24 hours',
        'Bank account opened in 3 days',
        'Payment gateway integrated in 1 week',
      ],
      metrics: {
        timeSaved: '20+ hours',
        costSaved: '$2,500',
        revenue: '$50K in first month',
      },
    },
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, Design Studio',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'Website Development',
    location: 'San Francisco, USA',
    date: '2024-01-10',
    testimonial: 'The website they built for us exceeded all expectations. Modern design, fast loading, and perfect SEO. Our traffic increased by 300% in the first month!',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caseStudy: {
      title: '300% Traffic Increase in 30 Days',
      challenge: 'Outdated website with poor performance and no SEO',
      solution: 'Complete website redesign with modern tech stack and SEO optimization',
      results: [
        '300% increase in organic traffic',
        '50% improvement in page load speed',
        'Mobile conversion rate up 200%',
        'Ranked #1 for target keywords',
      ],
      metrics: {
        timeSaved: '3 months',
        costSaved: '$15,000',
        revenue: '$120K in first quarter',
      },
    },
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Creative Director, Brand Co.',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'Logo & Branding',
    location: 'London, UK',
    date: '2024-01-05',
    testimonial: 'Our new brand identity perfectly captures our vision. The logo design process was collaborative and the final result is stunning. Highly recommend!',
    video: null,
    caseStudy: {
      title: 'Complete Brand Transformation',
      challenge: 'Inconsistent brand identity across all touchpoints',
      solution: 'Comprehensive branding package including logo, guidelines, and assets',
      results: [
        'Unified brand identity across all channels',
        'Brand recognition increased by 150%',
        'Customer engagement up 80%',
        'Professional brand guidelines created',
      ],
      metrics: {
        timeSaved: '2 months',
        costSaved: '$8,000',
        revenue: 'Brand value increased 200%',
      },
    },
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'E-commerce Entrepreneur',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'Payment Gateway Setup',
    location: 'Miami, USA',
    date: '2023-12-20',
    testimonial: 'Setting up payment processing was a nightmare until I found Evanio. They integrated multiple gateways, handled all the compliance, and we were live in days!',
    video: null,
    caseStudy: {
      title: 'Multi-Gateway Payment Integration',
      challenge: 'Needed to accept payments globally with multiple currencies',
      solution: 'Premium payment gateway setup with Stripe, PayPal, and regional processors',
      results: [
        '5 payment gateways integrated',
        'Support for 20+ currencies',
        '99.9% uptime achieved',
        'Payment processing time reduced by 60%',
      ],
      metrics: {
        timeSaved: '4 weeks',
        costSaved: '$5,000',
        revenue: '$200K processed in first month',
      },
    },
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Marketing Director, Growth Co.',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'Digital Marketing',
    location: 'Chicago, USA',
    date: '2023-12-15',
    testimonial: 'Their digital marketing strategy transformed our business. We saw a 250% ROI in the first quarter. The team is knowledgeable, creative, and results-driven.',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caseStudy: {
      title: '250% ROI in First Quarter',
      challenge: 'Low online visibility and poor conversion rates',
      solution: 'Comprehensive digital marketing campaign across multiple channels',
      results: [
        '250% ROI in first quarter',
        '500% increase in qualified leads',
        'Conversion rate improved by 180%',
        'Cost per acquisition reduced by 65%',
      ],
      metrics: {
        timeSaved: '6 months',
        costSaved: '$25,000',
        revenue: '$500K in new revenue',
      },
    },
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Operations Manager, Tech Corp',
    image: '/api/placeholder/80/80',
    rating: 5,
    service: 'AI Automation & Integration',
    location: 'Austin, USA',
    date: '2023-12-10',
    testimonial: 'The AI automation they set up saved us 20+ hours per week. Our workflows are now streamlined, and we can focus on growth instead of repetitive tasks.',
    video: null,
    caseStudy: {
      title: '20+ Hours Saved Per Week',
      challenge: 'Manual processes consuming too much time',
      solution: 'Premium AI automation suite with custom integrations',
      results: [
        '20+ hours saved per week',
        'Process efficiency increased by 300%',
        'Error rate reduced by 95%',
        'Team productivity up 150%',
      ],
      metrics: {
        timeSaved: '20 hours/week',
        costSaved: '$30,000/year',
        revenue: 'Scaled operations 3x',
      },
    },
  },
];

const services = ['All Services', 'Business Formation', 'Website Development', 'Logo & Branding', 'Payment Gateway Setup', 'Digital Marketing', 'AI Automation & Integration'];

export default function Testimonials() {
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesService = selectedService === 'All Services' || testimonial.service === selectedService;
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.testimonial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesSearch;
  });

  const stats = {
    totalTestimonials: testimonials.length,
    averageRating: 5.0,
    happyClients: 1000,
    projectsCompleted: 500,
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Testimonials & Case Studies | Evanio</title>
        <meta name="description" content="Read real testimonials and detailed case studies from our satisfied clients. See how Evanio has helped businesses grow and succeed." />
        <meta property="og:title" content="Testimonials & Case Studies | Evanio" />
        <meta property="og:description" content="Read real testimonials and detailed case studies from our satisfied clients." />
      </Helmet>
      <Header />
      <div className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Testimonials & Case Studies
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Real stories from real clients. See how we've helped businesses launch, grow, and succeed.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{stats.totalTestimonials}+</div>
                <div className="text-sm text-white/70">Testimonials</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{stats.averageRating}</div>
                <div className="text-sm text-white/70 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Average Rating
                </div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{stats.happyClients}+</div>
                <div className="text-sm text-white/70">Happy Clients</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">{stats.projectsCompleted}+</div>
                <div className="text-sm text-white/70">Projects</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedService === service
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/30 text-white'
                        : 'bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTestimonials.map((testimonial) => (
              <GlassCard
                key={testimonial.id}
                className="p-6 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-sm text-white/70 mb-2">{testimonial.role}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-white/90 text-sm line-clamp-3">{testimonial.testimonial}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(testimonial.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                    {testimonial.service}
                  </span>
                  {testimonial.video && (
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Play className="w-3 h-3" />
                      Video
                    </div>
                  )}
                  <button className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Case Study Modal */}
          {selectedTestimonial && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedTestimonial(null)}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="float-right text-white/70 hover:text-white mb-4"
                >
                  ✕
                </button>
                
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-20 h-20 rounded-full border-2 border-white/20 object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedTestimonial.name}</h2>
                    <p className="text-white/70 mb-2">{selectedTestimonial.role}</p>
                    <div className="flex items-center gap-2">
                      {[...Array(selectedTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {selectedTestimonial.video && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="400"
                      src={selectedTestimonial.video}
                      title="Testimonial Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}

                <div className="mb-6">
                  <Quote className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-lg text-white/90 leading-relaxed">{selectedTestimonial.testimonial}</p>
                </div>

                {selectedTestimonial.caseStudy && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{selectedTestimonial.caseStudy.title}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Challenge</h4>
                          <p className="text-white/80 text-sm">{selectedTestimonial.caseStudy.challenge}</p>
                        </div>
                        <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Solution</h4>
                          <p className="text-white/80 text-sm">{selectedTestimonial.caseStudy.solution}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold text-white mb-3">Results</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedTestimonial.caseStudy.results.map((result, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-white/90 text-sm">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg text-center">
                          <div className="text-2xl font-bold text-white mb-1">{selectedTestimonial.caseStudy.metrics.timeSaved}</div>
                          <div className="text-xs text-white/70">Time Saved</div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg text-center">
                          <div className="text-2xl font-bold text-white mb-1">{selectedTestimonial.caseStudy.metrics.costSaved}</div>
                          <div className="text-xs text-white/70">Cost Saved</div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-lg text-center">
                          <div className="text-2xl font-bold text-white mb-1">{selectedTestimonial.caseStudy.metrics.revenue}</div>
                          <div className="text-xs text-white/70">Revenue Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          )}

          {/* CTA Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Let's work together to make your business vision a reality. Get started today!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/services">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                  View Services
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

