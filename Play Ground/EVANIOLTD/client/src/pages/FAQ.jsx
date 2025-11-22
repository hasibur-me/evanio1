import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Clock, CheckCircle2, Sparkles, ArrowRight, Phone, Mail, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    category: 'General',
    icon: HelpCircle,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    questions: [
      {
        question: 'What is Evanio?',
        answer: 'Evanio is a comprehensive business services platform that helps you start, grow, and manage your business. We offer business formation, website development, branding, payment setup, and full business growth solutions.',
        popular: true,
      },
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply create an account, browse our services, and select the services you need. You can place an order directly from our services page.',
        popular: true,
      },
      {
        question: 'Is Evanio suitable for small businesses?',
        answer: 'Absolutely! Evanio is designed to help businesses of all sizes, from startups to established companies. We offer scalable solutions that grow with your business.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards and debit cards through our secure Stripe payment gateway. All transactions are encrypted and secure.',
      },
    ],
  },
  {
    category: 'Services',
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    questions: [
      {
        question: 'What services does Evanio offer?',
        answer: 'We offer Business Formation, Website Development, Logo & Branding, Social Media Management, Payment Gateway Setup, and Business Growth Support.',
        popular: true,
      },
      {
        question: 'How long does business formation take?',
        answer: 'Business formation typically takes 1-3 business days, depending on the state and type of business entity you choose. We\'ll keep you updated throughout the process.',
      },
      {
        question: 'Can you help with existing businesses?',
        answer: 'Yes! While we specialize in business formation, we also help existing businesses with website development, rebranding, payment setup, and growth strategies.',
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we offer ongoing support for all our services. You can contact our support team through your dashboard or by creating a support ticket.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Get Started" in the header or visit the registration page. Fill in your name, email, and password to create your account. It only takes a minute!',
        popular: true,
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to your Dashboard, then navigate to the Profile section. You can update your name, email, password, and other details there.',
      },
      {
        question: 'How do I view my payment history?',
        answer: 'All your payment history is available in the Payments section of your dashboard. You can view all transactions, their status, and Stripe session IDs.',
      },
      {
        question: 'Can I change my password?',
        answer: 'Yes, you can change your password at any time from your Profile settings in the dashboard. Click on "Change Password" and follow the prompts.',
      },
      {
        question: 'What if I forgot my password?',
        answer: 'If you forgot your password, please contact our support team. We\'ll help you reset your account password securely.',
      },
    ],
  },
  {
    category: 'Orders & Payments',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Visit our Services page, select a service, fill out the order form with your details, and submit. We\'ll contact you shortly to confirm details and proceed.',
        popular: true,
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards and debit cards through Stripe. All payments are processed securely and encrypted.',
      },
      {
        question: 'When will I be charged?',
        answer: 'Payment is processed when you place an order. For custom services, we may require a deposit upfront with the balance due upon completion.',
      },
      {
        question: 'Can I get a refund?',
        answer: 'Refund policies vary by service. Please contact our support team to discuss refund options for your specific order.',
      },
    ],
  },
  {
    category: 'Support',
    icon: MessageCircle,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    questions: [
      {
        question: 'How can I contact support?',
        answer: 'You can contact support through the Contact page, create a support ticket from your dashboard, or email us directly at info@evanio.com.',
        popular: true,
      },
      {
        question: 'How quickly will I receive a response?',
        answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us at +1 (234) 567-890.',
      },
      {
        question: 'Do you offer phone support?',
        answer: 'Yes, we offer phone support during business hours. You can reach us at +1 (234) 567-890 or email info@evanio.com.',
      },
      {
        question: 'Where can I find documentation?',
        answer: 'Comprehensive documentation is available in our Documentation section. You can also visit the Help Center for tutorials and guides.',
      },
    ],
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Get all popular questions
  const popularQuestions = faqs.flatMap(cat => 
    cat.questions
      .filter(q => q.popular)
      .map(q => ({ ...q, category: cat.category }))
  );

  const filteredFaqs = searchQuery
    ? faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : faqs;

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
    setOpenFaq(null);
  };

  const toggleFaq = (faqIndex) => {
    setOpenFaq(openFaq === faqIndex ? null : faqIndex);
  };

  // Highlight search terms in text
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-400/30 text-yellow-200 rounded px-1">{part}</mark>
      ) : part
    );
  };

  const stats = [
    { number: '500+', label: 'Questions Answered', icon: HelpCircle, color: 'text-blue-400' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: 'text-green-400' },
    { number: '99%', label: 'Satisfaction Rate', icon: CheckCircle2, color: 'text-purple-400' },
    { number: '<24hrs', label: 'Response Time', icon: Zap, color: 'text-yellow-400' },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Evanio</title>
        <meta name="description" content="Find answers to frequently asked questions about Evanio's services, account management, payments, and support. Get help quickly with our comprehensive FAQ." />
        <meta name="keywords" content="FAQ, help, support, questions, answers, Evanio, business services" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | Evanio" />
        <meta property="og:description" content="Find answers to frequently asked questions about Evanio's services." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-6">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Find quick answers to common questions. Can't find what you're looking for? <Link to="/contact" className="text-blue-300 hover:text-blue-200 underline font-semibold">Contact us</Link>.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <GlassCard key={index} variant="default" className="p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </GlassCard>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
                <input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 backdrop-blur-sm bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-white/70 text-sm mt-3">
                  Found {filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0)} result(s)
                </p>
              )}
            </div>
          </div>

          {/* Popular Questions Section */}
          {!searchQuery && popularQuestions.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Questions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {popularQuestions.slice(0, 6).map((faq, index) => {
                  const faqKey = `popular-${index}`;
                  const isFaqOpen = openFaq === faqKey;
                  return (
                    <GlassCard key={index} variant="default" className="p-6 hover:scale-105 transition-all duration-300">
                      <button
                        onClick={() => toggleFaq(faqKey)}
                        className="w-full flex items-start justify-between text-left gap-4"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4 flex-1">{faq.question}</h3>
                        {isFaqOpen ? (
                          <ChevronUp className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                        )}
                      </button>
                      {isFaqOpen && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                          <span className="inline-block mt-3 px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-xs text-blue-300">
                            {faq.category}
                          </span>
                        </div>
                      )}
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredFaqs.map((category, categoryIndex) => {
              const isCategoryOpen = openCategory === category.category;
              const Icon = category.icon;

              return (
                <GlassCard 
                  key={categoryIndex} 
                  variant="service" 
                  className="p-6 md:p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="w-full flex items-center justify-between text-left mb-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all duration-300`}>
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">{category.category}</h2>
                        <p className="text-white/60 text-sm mt-1">{category.questions.length} questions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isCategoryOpen ? (
                        <ChevronUp className="w-6 h-6 text-white transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  {isCategoryOpen && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-white/20 animate-fadeIn">
                      {category.questions.map((faq, faqIndex) => {
                        const faqKey = `${categoryIndex}-${faqIndex}`;
                        const isFaqOpen = openFaq === faqKey;

                        return (
                          <div 
                            key={faqIndex} 
                            className="border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300 bg-white/5"
                          >
                            <button
                              onClick={() => toggleFaq(faqKey)}
                              className="w-full flex items-center justify-between text-left gap-4"
                            >
                              <div className="flex items-start gap-3 flex-1">
                                {faq.popular && (
                                  <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                )}
                                <h3 className="text-lg font-semibold text-white pr-4">{highlightText(faq.question, searchQuery)}</h3>
                              </div>
                              {isFaqOpen ? (
                                <ChevronUp className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300" />
                              )}
                            </button>
                            {isFaqOpen && (
                              <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                                <p className="text-white/80 leading-relaxed">{highlightText(faq.answer, searchQuery)}</p>
                              </div>
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

          {/* No Results Message */}
          {searchQuery && filteredFaqs.length === 0 && (
            <GlassCard variant="cta" className="p-8 md:p-12 text-center">
              <HelpCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">No results found</h2>
              <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
                We couldn't find any questions matching "{searchQuery}". Try different keywords or contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-full px-6 py-3 font-medium transition-all duration-300"
                >
                  Clear Search
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-6 py-3 font-medium transition-all duration-300"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </GlassCard>
          )}

          {/* Contact Support */}
          <GlassCard variant="cta" className="p-8 md:p-12 mt-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our friendly support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </Link>
                <a
                  href="mailto:info@evanio.com"
                  className="inline-flex items-center justify-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">24/7 Support</p>
                  <p className="text-white/70 text-sm">Always here to help</p>
                </div>
                <div className="p-4">
                  <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">Fast Response</p>
                  <p className="text-white/70 text-sm">Within 24 hours</p>
                </div>
                <div className="p-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">Expert Team</p>
                  <p className="text-white/70 text-sm">Knowledgeable & friendly</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}
