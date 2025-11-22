import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Search, ChevronDown, ChevronUp, Book, MessageSquare, FileText, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Get Started" in the header or visit the registration page. Fill in your name, email, and password to create your account.',
      },
      {
        question: 'What services does Evanio offer?',
        answer: 'We offer business formation, website development, logo & branding, payment gateway setup, and comprehensive business growth solutions.',
      },
      {
        question: 'How do I place an order?',
        answer: 'Browse our services page, select a service, fill out the order form, and submit. We\'ll contact you shortly to confirm details.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    icon: FileText,
    faqs: [
      {
        question: 'How long does business formation take?',
        answer: 'Business formation typically takes 1-3 business days, depending on the state and type of business entity you choose.',
      },
      {
        question: 'Can you help with website design?',
        answer: 'Yes! We offer complete website development services, including design, development, and deployment.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards and debit cards through our secure Stripe payment gateway.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & Billing',
    icon: MessageSquare,
    faqs: [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to your Dashboard, then navigate to the Profile section. You can update your name, email, and other details there.',
      },
      {
        question: 'Where can I view my payment history?',
        answer: 'All your payment history is available in the Payments section of your dashboard.',
      },
      {
        question: 'How do I change my password?',
        answer: 'Visit your Profile settings in the dashboard. You\'ll find an option to change your password there.',
      },
    ],
  },
];

const helpArticles = [
  { title: 'Getting Started Guide', icon: Book, link: '/documentation' },
  { title: 'Video Tutorials', icon: Video, link: '/documentation' },
  { title: 'Contact Support', icon: MessageSquare, link: '/contact' },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setOpenFaq(null);
  };

  const toggleFaq = (faqIndex) => {
    setOpenFaq(openFaq === faqIndex ? null : faqIndex);
  };

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Help Center
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get the help you need.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 backdrop-blur-sm bg-white/20 border border-white/30 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>

          {/* Help Articles */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {helpArticles.map((article, index) => {
              const Icon = article.icon;
              return (
                <Link key={index} to={article.link}>
                  <GlassCard variant="service" className="p-6 cursor-pointer hover:bg-white/25 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-4">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isOpen = openCategory === category.id;

              return (
                <GlassCard key={category.id} variant="service" className="p-6">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">{category.title}</h2>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-6 space-y-4 pl-16">
                      {category.faqs.map((faq, index) => {
                        const faqKey = `${category.id}-${index}`;
                        const isFaqOpen = openFaq === faqKey;

                        return (
                          <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                            <button
                              onClick={() => toggleFaq(faqKey)}
                              className="w-full flex items-center justify-between text-left"
                            >
                              <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                              {isFaqOpen ? (
                                <ChevronUp className="w-5 h-5 text-white flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-white flex-shrink-0" />
                              )}
                            </button>
                            {isFaqOpen && (
                              <p className="text-white/80 mt-3 leading-relaxed">{faq.answer}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>

          {/* Contact Support */}
          <GlassCard variant="cta" className="p-8 md:p-12 mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Contact Support
            </Link>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}




