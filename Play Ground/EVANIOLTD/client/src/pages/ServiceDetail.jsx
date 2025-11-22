import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getServiceBySlug } from '../data/services';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Clock,
  Users,
  Shield,
  Zap,
  CheckCircle2,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState('professional');

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) {
    return null;
  }

  const Icon = service.icon;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const metaDescription = `${service.title} - ${service.longDescription.substring(0, 160)}...`;
  const metaTitle = `${service.title} | Evanio - Professional Business Services`;

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: service.pricing.starter,
      popular: false,
      features: [
        'Basic service package',
        'Email support',
        'Standard delivery time',
        '1 revision included'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: service.pricing.professional,
      popular: true,
      features: [
        'Complete service package',
        'Priority support',
        'Faster delivery',
        '3 revisions included',
        'Dedicated account manager'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: service.pricing.enterprise,
      popular: false,
      features: [
        'Custom solution',
        '24/7 priority support',
        'Fastest delivery',
        'Unlimited revisions',
        'Dedicated team',
        'Custom integrations'
      ]
    },
  ];

  const stats = [
    { label: 'Success Rate', value: '99%', icon: TrendingUp },
    { label: 'Client Satisfaction', value: '4.9/5', icon: Star },
    { label: 'Avg. Delivery', value: '5-7 Days', icon: Clock },
    { label: 'Support', value: '24/7', icon: Users },
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${service.title}, business services, ${service.title.toLowerCase()}, Evanio`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://evanio.com/service/${service.slug}`} />
      </Helmet>
      <GlassBackground>
        <Header />
        <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-blue-400/50" role="img" aria-label={`${service.title} icon`}>
                <Icon className="w-12 h-12 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {service.longDescription}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <Card glass key={index} className="p-4 text-center">
                      <StatIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </Card>
                  );
                })}
              </div>

              <Link to={`/service-request?service=${service.id}`} className="mt-8 inline-block">
                <Button
                  size="lg"
                  className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-full px-10 py-4 text-lg font-medium flex items-center gap-2 mx-auto"
                  aria-label={`Get started with ${service.title}`}
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            {/* Benefits Section */}
            <GlassCard variant="cta" className="p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  What You'll Get
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Comprehensive benefits designed to help your business succeed
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.benefits.map((benefit, index) => (
                  <Card glass key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-green-400/50" role="img" aria-label="Check mark">
                        <Check className="w-5 h-5 text-green-300" aria-hidden="true" />
                      </div>
                      <p className="text-white/90 leading-relaxed">{benefit}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </GlassCard>

            {/* Enhanced Pricing Section */}
            <GlassCard variant="cta" className="p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Choose Your Plan
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Select the perfect package for your business needs
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {pricingTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    glass
                    className={`p-6 relative transition-all duration-300 hover:scale-105 ${
                      tier.popular
                        ? 'border-2 border-yellow-400/50 bg-gradient-to-br from-yellow-500/10 to-blue-500/10'
                        : 'border border-white/20'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-400/50 rounded-full">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">Most Popular</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-4xl font-bold text-white mb-4">{tier.price}</p>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={`/service-request?service=${service.id}&tier=${tier.id}`}>
                      <Button
                        className={`w-full ${
                          tier.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                        }`}
                        aria-label={`Select ${tier.name} plan`}
                      >
                        Select Plan
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to={`/service-request?service=${service.id}`}>
                  <Button
                    variant="outline"
                    className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
                    aria-label="Request custom quote"
                  >
                    Need a Custom Solution? Contact Us
                  </Button>
                </Link>
              </div>
            </GlassCard>

            {/* FAQ Section */}
            <GlassCard variant="cta" className="p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Everything you need to know about this service
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {service.faqs.map((faq, index) => (
                  <Card
                    key={index}
                    glass
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left p-6 hover:bg-white/5 transition-colors"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div id={`faq-answer-${index}`} className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </GlassCard>

            {/* CTA Section */}
            <GlassCard variant="cta" className="p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8">
                  Fill out our service request form and we'll get back to you within 24 hours to discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={`/service-request?service=${service.id}`}>
                    <Button
                      size="lg"
                      className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-full px-10 py-4 text-lg font-medium flex items-center gap-2"
                      aria-label={`Request ${service.title} service`}
                    >
                      Request Service
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-10 py-4 text-lg font-medium"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        <Footer />
      </GlassBackground>
    </>
  );
}
