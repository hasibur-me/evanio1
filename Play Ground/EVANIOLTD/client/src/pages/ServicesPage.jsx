import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import api from '../utils/api';
import {
  Building2,
  Globe,
  Palette,
  Share2,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  Star,
  Clock,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const services = [
  {
    id: 'business-formation',
    icon: Building2,
    title: 'Business Formation',
    description: 'Complete business registration and legal entity setup to get your company started quickly and correctly.',
    price: 299,
    duration: '5-7 business days',
    category: 'legal',
    featured: true,
    rating: 4.9
  },
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    description: 'Professional, responsive websites designed to convert visitors into customers and grow your online presence.',
    price: 999,
    duration: '2-3 weeks',
    category: 'digital',
    featured: true,
    rating: 4.8
  },
  {
    id: 'logo-branding',
    icon: Palette,
    title: 'Logo & Branding',
    description: 'Create a memorable brand identity with custom logos, color schemes, and brand guidelines that stand out.',
    price: 499,
    duration: '7-10 business days',
    category: 'design',
    featured: false,
    rating: 4.9
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Social Media Management',
    description: 'Build and maintain your social media presence with strategic content that engages and converts your audience.',
    price: 399,
    duration: 'Ongoing',
    category: 'marketing',
    featured: false,
    rating: 4.7
  },
  {
    id: 'payment-gateway',
    icon: CreditCard,
    title: 'Payment Gateway Setup',
    description: 'Seamless payment processing integration to accept payments online and grow your revenue efficiently.',
    price: 199,
    duration: '3-5 business days',
    category: 'digital',
    featured: true,
    rating: 4.8
  },
  {
    id: 'business-growth',
    icon: TrendingUp,
    title: 'Business Growth Support',
    description: 'Comprehensive business growth strategies and ongoing support to scale your operations and increase profitability.',
    price: 799,
    duration: 'Ongoing',
    category: 'consulting',
    featured: false,
    rating: 4.9
  },
];

const categories = [
  { value: 'all', label: 'All Services' },
  { value: 'legal', label: 'Legal & Formation' },
  { value: 'digital', label: 'Digital Services' },
  { value: 'design', label: 'Design & Branding' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'consulting', label: 'Consulting' },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setOrderForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Filter and sort services
  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleSelectService = (service) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setOrderForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!selectedService) {
      alert('Please select a service first');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user is logged in
      if (!user) {
        // Redirect to login/register
        const shouldRegister = window.confirm('You need to be logged in to place an order. Would you like to register?');
        if (shouldRegister) {
          navigate('/register');
        } else {
          navigate('/login');
        }
        return;
      }

      // Validate form data
      if (!orderForm.name || !orderForm.email || !orderForm.phone) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        setIsSubmitting(false);
        return;
      }

      // Create a ticket for the order
      const orderMessage = `Service: ${selectedService.title}\nPrice: $${selectedService.price}\nDuration: ${selectedService.duration}\n\nCustomer Details:\nName: ${orderForm.name}\nEmail: ${orderForm.email}\nPhone: ${orderForm.phone}${orderForm.company ? `\nCompany: ${orderForm.company}` : ''}\n\nAdditional Message:\n${orderForm.message || 'None'}`;
      
      const response = await api.post('/tickets', {
        subject: `Order: ${selectedService.title}`,
        message: orderMessage,
        type: 'order'
      });

      alert(`Order placed successfully! Order ID: ${response.data._id}\nWe will contact you shortly.`);
      setSelectedService(null);
      setOrderForm({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        company: '',
        message: ''
      });
      navigate('/dashboard/tickets');
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again or contact support.';
      alert(`Order Failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Our Services - Evanio | Comprehensive Business Solutions</title>
        <meta name="description" content="Comprehensive business solutions to help you launch, grow, and succeed. Choose a service below to place your order." />
      </Helmet>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Comprehensive business solutions to help you launch, grow, and succeed. Choose a service below to place your order.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    glass
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value} className="bg-gray-900">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured" className="bg-gray-900">Featured First</option>
                    <option value="price-low" className="bg-gray-900">Price: Low to High</option>
                    <option value="price-high" className="bg-gray-900">Price: High to Low</option>
                    <option value="rating" className="bg-gray-900">Highest Rated</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-white/70">
                Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedService?.id === service.id;
                return (
                  <Card
                    key={service.id}
                    glass
                    className={`p-6 md:p-8 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent bg-white/30'
                        : 'hover:bg-white/25 hover:scale-105'
                    } ${service.featured ? 'border-2 border-yellow-400/50' : ''}`}
                    onClick={() => handleSelectService(service)}
                  >
                    {service.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-400/50 rounded-full">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">Featured</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl flex items-center justify-center border border-blue-400/30">
                        <Icon className="w-7 h-7 text-blue-300" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-white/90 font-medium">{service.rating}</span>
                      </div>
                      <span className="text-white/50">•</span>
                      <div className="flex items-center gap-1 text-white/70 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          ${service.price}
                        </p>
                        <p className="text-xs text-white/60">
                          Starting price
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectService(service);
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <Card glass className="p-12 text-center">
                <p className="text-white/80 text-lg">No services found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              </Card>
            )}

            {/* Order Form */}
            {selectedService && (
              <GlassCard variant="cta" className="p-8 md:p-12 max-w-3xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Place Your Order
                  </h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-white/80">
                      Service: <span className="font-semibold text-white">{selectedService.title}</span>
                    </p>
                    <span className="text-white/50">•</span>
                    <p className="text-white/80">
                      Price: <span className="font-semibold text-white">${selectedService.price}</span>
                    </p>
                    <span className="text-white/50">•</span>
                    <p className="text-white/80">
                      Duration: <span className="font-semibold text-white">{selectedService.duration}</span>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Full Name *
                      </label>
                      <Input
                        glass
                        type="text"
                        name="name"
                        value={orderForm.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email *
                      </label>
                      <Input
                        glass
                        type="email"
                        name="email"
                        value={orderForm.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        glass
                        type="tel"
                        name="phone"
                        value={orderForm.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Company Name
                      </label>
                      <Input
                        glass
                        type="text"
                        name="company"
                        value={orderForm.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Additional Requirements / Message
                    </label>
                    <Textarea
                      glass
                      name="message"
                      value={orderForm.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your specific requirements..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Placing Order...' : (
                        <>
                          Place Order - ${selectedService.price}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedService(null)}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>

                  {!user && (
                    <p className="text-sm text-white/70 text-center mt-4">
                      You need to be logged in to place an order.{' '}
                      <Link to="/login" className="text-blue-400 hover:underline">
                        Login
                      </Link>
                      {' or '}
                      <Link to="/register" className="text-blue-400 hover:underline">
                        Register
                      </Link>
                    </p>
                  )}
                </form>
              </GlassCard>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </GlassBackground>
  );
}
