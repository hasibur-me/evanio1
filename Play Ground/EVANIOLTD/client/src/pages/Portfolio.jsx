import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';
import {
  Award,
  Globe,
  Palette,
  Code,
  TrendingUp,
  ShoppingBag,
  Briefcase,
  Heart,
  Home,
  Store,
  Zap,
  Star,
  ExternalLink,
  X,
  Filter,
  Grid3x3,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: 'All', name: 'All Projects', icon: Grid3x3, count: 24 },
    { id: 'Website', name: 'Websites', icon: Globe, count: 8 },
    { id: 'Branding', name: 'Branding', icon: Palette, count: 6 },
    { id: 'E-commerce', name: 'E-commerce', icon: ShoppingBag, count: 5 },
    { id: 'Marketing', name: 'Marketing', icon: TrendingUp, count: 5 },
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: CheckCircle2, color: 'text-blue-400' },
    { number: '98%', label: 'Client Satisfaction', icon: Star, color: 'text-yellow-400' },
    { number: '50+', label: 'Happy Clients', icon: Users, color: 'text-green-400' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: 'text-purple-400' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Tech Startup Website',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      description: 'Modern SaaS platform with clean UI and powerful features',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      client: 'TechVenture Inc.',
      year: '2024',
      url: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Premium Brand Identity',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      description: 'Complete brand system with logo, colors, and guidelines',
      technologies: ['Brand Design', 'Logo Design', 'Brand Guidelines'],
      client: 'FashionHub',
      year: '2024',
      url: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'Full-featured online store with payment integration',
      technologies: ['Shopify', 'Custom Development', 'Payment Gateway'],
      client: 'ShopGlobal',
      year: '2024',
      url: '#',
      featured: true,
    },
    {
      id: 4,
      title: 'Digital Marketing Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      description: 'Multi-channel marketing strategy with 300% ROI increase',
      technologies: ['Facebook Ads', 'Google Ads', 'SEO', 'Content Marketing'],
      client: 'RetailPlus',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'Corporate Website Redesign',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      description: 'Complete website overhaul with modern design',
      technologies: ['WordPress', 'Custom Theme', 'CMS Integration'],
      client: 'Business Corp',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Healthcare Branding',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
      description: 'Professional and trustworthy brand identity',
      technologies: ['Logo Design', 'Brand Guidelines', 'Print Design'],
      client: 'HealthCare Plus',
      year: '2023',
      url: '#',
      featured: false,
    },
    {
      id: 7,
      title: 'Dropshipping Store',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'High-converting dropshipping store with automation',
      technologies: ['Shopify', 'Oberlo', 'Marketing Automation'],
      client: 'DropShip Pro',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 8,
      title: 'Social Media Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      description: 'Viral social media campaign with 1M+ impressions',
      technologies: ['Instagram', 'TikTok', 'Facebook', 'Content Creation'],
      client: 'Social Brand',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 9,
      title: 'Portfolio Website',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      description: 'Creative portfolio with smooth animations',
      technologies: ['React', 'Framer Motion', 'GSAP'],
      client: 'Creative Agency',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 10,
      title: 'Food & Beverage Branding',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800&h=600&fit=crop',
      description: 'Appetizing and memorable brand identity',
      technologies: ['Logo Design', 'Packaging', 'Menu Design'],
      client: 'Foodie Co',
      year: '2023',
      url: '#',
      featured: false,
    },
    {
      id: 11,
      title: 'Landing Page Design',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      description: 'High-converting landing page for product launch',
      technologies: ['Next.js', 'A/B Testing', 'Conversion Optimization'],
      client: 'LaunchPad',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 12,
      title: 'Fashion Brand Identity',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
      description: 'Luxury brand identity with elegant typography',
      technologies: ['Brand Design', 'Fashion Photography', 'Social Media'],
      client: 'Luxury Fashion',
      year: '2023',
      url: '#',
      featured: false,
    },
    {
      id: 13,
      title: 'Online Marketplace',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'Multi-vendor marketplace platform',
      technologies: ['Custom Development', 'Payment Integration', 'Vendor System'],
      client: 'MarketPlace Pro',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 14,
      title: 'Email Marketing Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      description: 'Automated email sequences with 40% open rate',
      technologies: ['Klaviyo', 'Email Design', 'Automation'],
      client: 'Email Experts',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 15,
      title: 'Web Application',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Custom web application with user authentication',
      technologies: ['React', 'MongoDB', 'Express', 'Node.js'],
      client: 'App Developers',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 16,
      title: 'SaaS Product Branding',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      description: 'Modern tech brand with clean, scalable design',
      technologies: ['Logo Design', 'UI/UX', 'Brand Guidelines'],
      client: 'SaaS Platform',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 17,
      title: 'Subscription Store',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'Subscription-based e-commerce platform',
      technologies: ['Shopify Plus', 'Subscription App', 'Recurring Billing'],
      client: 'SubBox Co',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 18,
      title: 'SEO Optimization Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      description: 'SEO strategy resulting in 500% traffic increase',
      technologies: ['Technical SEO', 'Content Strategy', 'Link Building'],
      client: 'SEO Masters',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 19,
      title: 'Mobile-First Website',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      description: 'Responsive website optimized for mobile devices',
      technologies: ['React', 'Mobile Optimization', 'PWA'],
      client: 'Mobile First',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 20,
      title: 'Restaurant Branding',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800&h=600&fit=crop',
      description: 'Complete restaurant brand identity package',
      technologies: ['Logo Design', 'Menu Design', 'Interior Branding'],
      client: 'Fine Dining',
      year: '2023',
      url: '#',
      featured: false,
    },
    {
      id: 21,
      title: 'Influencer Marketing Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      description: 'Influencer partnership campaign with 2M reach',
      technologies: ['Influencer Outreach', 'Content Creation', 'Analytics'],
      client: 'Influence Co',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 22,
      title: 'Real Estate Website',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      description: 'Property listing website with advanced search',
      technologies: ['WordPress', 'Property Plugin', 'Map Integration'],
      client: 'Real Estate Pro',
      year: '2024',
      url: '#',
      featured: false,
    },
    {
      id: 23,
      title: 'Tech Startup Branding',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop',
      description: 'Bold typography-based logo with comprehensive brand system',
      technologies: ['Logo Design', 'Brand Guidelines', 'Web Design'],
      client: 'Startup Inc',
      year: '2023',
      url: '#',
      featured: false,
    },
    {
      id: 24,
      title: 'Content Marketing Strategy',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      description: 'Content strategy driving 200% lead increase',
      technologies: ['Content Planning', 'Blog Writing', 'Social Media'],
      client: 'Content Co',
      year: '2024',
      url: '#',
      featured: false,
    },
  ];

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const featuredItems = portfolioItems.filter(item => item.featured);

  return (
    <GlassBackground>
      <Helmet>
        <title>Portfolio — Evanio | Our Work & Success Stories</title>
        <meta name="description" content="Explore our portfolio of successful projects. From websites and branding to e-commerce and digital marketing campaigns. See how we've helped 50+ clients grow their businesses." />
        <meta name="keywords" content="portfolio, case studies, web design portfolio, branding portfolio, marketing campaigns, e-commerce projects" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-6">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">500+ Projects Delivered</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Portfolio
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Success Stories & Case Studies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
              Explore our collection of successful projects across websites, branding, e-commerce, and digital marketing
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <GlassCard key={index} variant="default" className="p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm md:text-base text-white/70">{stat.label}</div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Featured Projects */}
          {selectedCategory === 'All' && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Featured Projects
                  </h2>
                  <p className="text-white/80">Our most successful and impactful work</p>
                </div>
                <Sparkles className="w-8 h-8 text-yellow-400 hidden md:block" />
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {featuredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(item.title)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-400/50 rounded text-yellow-300 text-xs font-semibold">
                              Featured
                            </span>
                            <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-xs">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                          <p className="text-white/80 text-sm mb-3">{item.description}</p>
                          <div className="flex items-center gap-4 text-white/60 text-xs">
                            <span>{item.client}</span>
                            <span>•</span>
                            <span>{item.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <GlassCard variant="default" className="mb-12 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-white/60" />
              <h3 className="text-xl font-bold text-white">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-500/30 border-blue-400/70 text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-500/50' : 'bg-white/10'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Portfolio Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selectedCategory === 'All' ? 'All Projects' : `${selectedCategory} Projects`}
                </h2>
                <p className="text-white/80">{filteredItems.length} projects found</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(item.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-xs">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-white/60 text-xs">
                          <span>{item.client}</span>
                          <span>•</span>
                          <span>{item.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white/70 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white/70 text-xs">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <GlassCard variant="cta" className="mb-12 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch and let's discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg inline-flex items-center whitespace-nowrap"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm border border-white/30 text-white hover:bg-white/10"
                >
                  View Our Services
                </Button>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Portfolio Item Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(selectedItem.title)}`;
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-semibold">
                  {selectedItem.category}
                </span>
                {selectedItem.featured && (
                  <span className="px-3 py-1 bg-yellow-500/30 backdrop-blur-sm border border-yellow-400/50 rounded-full text-yellow-300 text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-lg text-white/80 mb-6">{selectedItem.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Client</h3>
                  <p className="text-white/70">{selectedItem.client}</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Year</h3>
                  <p className="text-white/70">{selectedItem.year}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white/80 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selectedItem.url && (
                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/80 border border-blue-500/50 rounded-full text-white hover:bg-blue-600/90 transition-colors"
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </GlassBackground>
  );
}

