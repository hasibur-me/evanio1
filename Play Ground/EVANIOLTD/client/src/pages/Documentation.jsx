import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Book, Video, FileText, Code, Settings, CreditCard, ArrowRight } from 'lucide-react';

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    articles: [
      { title: 'Welcome to Evanio', description: 'An introduction to our platform and services' },
      { title: 'Creating Your Account', description: 'Step-by-step guide to registration' },
      { title: 'Setting Up Your Profile', description: 'Complete your profile information' },
      { title: 'Dashboard Overview', description: 'Navigate your dashboard effectively' },
    ],
  },
  {
    id: 'services',
    title: 'Services Guide',
    icon: FileText,
    articles: [
      { title: 'Business Formation', description: 'How to start your business with Evanio' },
      { title: 'Website Development', description: 'Building your online presence' },
      { title: 'Logo & Branding', description: 'Create your brand identity' },
      { title: 'Payment Gateway Setup', description: 'Accept payments on your website' },
    ],
  },
  {
    id: 'api',
    title: 'API Documentation',
    icon: Code,
    articles: [
      { title: 'Authentication', description: 'How to authenticate API requests' },
      { title: 'Endpoints Overview', description: 'Available API endpoints' },
      { title: 'Webhooks', description: 'Setting up and using webhooks' },
      { title: 'Rate Limits', description: 'Understanding API rate limits' },
    ],
  },
  {
    id: 'account',
    title: 'Account Management',
    icon: Settings,
    articles: [
      { title: 'Profile Settings', description: 'Manage your account information' },
      { title: 'Password Security', description: 'Keep your account secure' },
      { title: 'Notifications', description: 'Configure notification preferences' },
      { title: 'Billing & Subscriptions', description: 'Manage your payments' },
    ],
  },
  {
    id: 'payments',
    title: 'Payment Guide',
    icon: CreditCard,
    articles: [
      { title: 'Payment Methods', description: 'Accepted payment methods' },
      { title: 'Processing Payments', description: 'How payments are processed' },
      { title: 'Refunds', description: 'Understanding our refund policy' },
      { title: 'Payment History', description: 'View your transaction history' },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: Settings,
    articles: [
      { title: 'Common Issues', description: 'Solutions to frequent problems' },
      { title: 'Browser Compatibility', description: 'Supported browsers and versions' },
      { title: 'Error Messages', description: 'Understanding error codes' },
      { title: 'Performance Tips', description: 'Optimize your experience' },
    ],
  },
];

const videoTutorials = [
  { title: 'Getting Started in 5 Minutes', duration: '5:30', thumbnail: '🎬' },
  { title: 'Placing Your First Order', duration: '8:15', thumbnail: '📦' },
  { title: 'Managing Your Documents', duration: '6:45', thumbnail: '📄' },
  { title: 'Payment Processing Guide', duration: '10:20', thumbnail: '💳' },
];

export default function Documentation() {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive guides and tutorials to help you make the most of Evanio's services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <GlassCard variant="service" className="p-6 cursor-pointer hover:bg-white/25 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Quick Start Guide</h3>
              </div>
              <p className="text-white/80 mb-4">New to Evanio? Start here for a quick overview.</p>
              <button className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-medium">
                Read Guide
                <ArrowRight className="w-4 h-4" />
              </button>
            </GlassCard>

            <GlassCard variant="service" className="p-6 cursor-pointer hover:bg-white/25 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Video Tutorials</h3>
              </div>
              <p className="text-white/80 mb-4">Watch step-by-step video guides for all features.</p>
              <button className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-medium">
                Watch Videos
                <ArrowRight className="w-4 h-4" />
              </button>
            </GlassCard>
          </div>

          {/* Documentation Sections */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Documentation Sections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docSections.map((section) => {
                const Icon = section.icon;
                return (
                  <GlassCard
                    key={section.id}
                    variant="service"
                    className="p-6 cursor-pointer hover:bg-white/25 transition-colors"
                    onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                    </div>
                    {selectedSection === section.id && (
                      <div className="space-y-3 mt-4 pt-4 border-t border-white/20">
                        {section.articles.map((article, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                            <h4 className="font-semibold text-white mb-1">{article.title}</h4>
                            <p className="text-sm text-white/70">{article.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Video Tutorials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoTutorials.map((video, index) => (
                <GlassCard key={index} variant="service" className="p-6 cursor-pointer hover:bg-white/25 transition-colors">
                  <div className="text-5xl mb-4">{video.thumbnail}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{video.duration}</p>
                  <button className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-medium text-sm">
                    Watch Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Support */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              If you can't find what you're looking for, our support team is ready to assist you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium transition-colors"
            >
              Contact Support
            </a>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}




