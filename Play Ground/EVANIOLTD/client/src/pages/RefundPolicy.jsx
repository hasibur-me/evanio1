import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { ShieldCheck, Clock, DollarSign, CheckCircle2, Sparkles, Mail, Phone, ArrowRight, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: ShieldCheck },
    { id: 'guarantee', title: 'Money-Back Guarantee', icon: DollarSign },
    { id: 'timeliness', title: 'Timeliness Guarantee', icon: Clock },
    { id: 'process', title: 'Refund Process', icon: FileText },
    { id: 'exclusions', title: 'Exclusions', icon: ShieldCheck },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Refund Policy | Evanio</title>
        <meta name="description" content="Evanio's Money-Back Guarantee and Refund Policy. 30-day money-back guarantee with no hidden fees. Learn about our refund process and terms." />
        <meta property="og:title" content="Refund Policy | Evanio" />
        <meta property="og:description" content="Evanio's Money-Back Guarantee and Refund Policy. 30-day money-back guarantee with no hidden fees." />
      </Helmet>
      <Header />
      <div className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-lg">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Money-Back Guarantee & Refund Policy
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Our commitment to your satisfaction and complete transparency
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/90">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/90">Fast Processing</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30 border border-white/30 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </GlassCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <GlassCard variant="cta" className="p-8 md:p-12">
                <div className="prose prose-invert max-w-none space-y-12">

                  {/* Overview */}
                  {activeSection === 'overview' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                        Our Commitment to You
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        At Evanio, we take all the risks to ensure your company is ready to grow. We stand behind our services with a straightforward money-back guarantee policy.
                      </p>
                      <p className="text-base text-white/80 leading-relaxed mb-6">
                        Our promise is simple: receive all the required documents within the agreed timeframe, or get your money back in full.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg">
                          <DollarSign className="w-8 h-8 text-green-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Full Refund</h3>
                          <p className="text-white/80 text-sm">100% money-back guarantee within 30 days</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                          <Clock className="w-8 h-8 text-blue-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Fast Processing</h3>
                          <p className="text-white/80 text-sm">Refunds processed within 5-7 business days</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-lg">
                          <ShieldCheck className="w-8 h-8 text-purple-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">No Questions Asked</h3>
                          <p className="text-white/80 text-sm">Simple and hassle-free refund process</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-white/20 rounded-lg">
                          <CheckCircle2 className="w-8 h-8 text-pink-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Transparent Policy</h3>
                          <p className="text-white/80 text-sm">Clear terms with no hidden fees</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Money-Back Guarantee */}
                  {activeSection === 'guarantee' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-400" />
                        30-Day Money-Back Guarantee
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        If you're not completely satisfied with our services within 30 days of purchase, we'll refund your payment in full—no questions asked.
                      </p>
                      <div className="space-y-4 mb-6">
                        {[
                          { text: 'Full refund within 30 days of service purchase', icon: CheckCircle2 },
                          { text: 'No hidden fees or cancellation charges', icon: CheckCircle2 },
                          { text: 'Quick and hassle-free refund process', icon: CheckCircle2 },
                          { text: 'Refunds processed within 5-7 business days', icon: CheckCircle2 },
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-3">
                              <Icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span className="text-white/90">{item.text}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-2">How It Works</h3>
                        <p className="text-white/90">
                          Simply contact our support team within 30 days of your purchase date, and we'll process your full refund to your original payment method. No questions asked, no hassle.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Timeliness Guarantee */}
                  {activeSection === 'timeliness' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Clock className="w-8 h-8 text-blue-400" />
                        Timeliness Guarantee
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-4">
                        We guarantee that you will receive all required documents within the agreed timeframe specified in your service agreement.
                      </p>
                      <p className="text-base text-white/80 leading-relaxed mb-6">
                        If we fail to deliver the documents within the agreed timeframe due to our error or delay, you are entitled to a full refund.
                      </p>
                      <div className="backdrop-blur-sm bg-blue-500/20 border border-blue-400/30 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-4">
                          <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">Important Notice</h3>
                            <p className="text-white/90">
                              Delays caused by factors outside our control (such as government processing times, incorrect information provided, or third-party delays) are excluded from this guarantee.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Covered</h4>
                          <p className="text-white/80 text-sm">Delays caused by our errors or internal processes</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Not Covered</h4>
                          <p className="text-white/80 text-sm">Third-party delays, government processing, incorrect information</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Refund Process */}
                  {activeSection === 'process' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        How to Request a Refund
                      </h2>
                      <div className="space-y-6">
                        {[
                          {
                            step: '1',
                            title: 'Contact Us',
                            desc: 'Send a refund request to our support team at support@evanio.com or through your dashboard.',
                            icon: Mail,
                          },
                          {
                            step: '2',
                            title: 'Provide Details',
                            desc: 'Include your order number, purchase date, and reason for the refund request.',
                            icon: FileText,
                          },
                          {
                            step: '3',
                            title: 'Review Process',
                            desc: 'Our team will review your request within 2 business days.',
                            icon: CheckCircle2,
                          },
                          {
                            step: '4',
                            title: 'Refund Processing',
                            desc: 'Once approved, your refund will be processed within 5-7 business days to your original payment method.',
                            icon: DollarSign,
                          },
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-lg">{item.step}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Icon className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                  </div>
                                  <p className="text-white/80">{item.desc}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Exclusions */}
                  {activeSection === 'exclusions' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-red-400" />
                        What's Not Covered
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        The following situations are not eligible for refunds:
                      </p>
                      <div className="space-y-3">
                        {[
                          'Services completed and delivered as agreed',
                          'Delays caused by incorrect information provided by the customer',
                          'Delays from third parties (banks, government agencies, etc.)',
                          'Requests made after 30 days from the purchase date',
                          'Custom work that has been completed and delivered',
                        ].map((exclusion, index) => (
                          <div key={index} className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg flex items-start gap-3">
                            <span className="text-red-400 font-bold text-lg">×</span>
                            <span className="text-white/90">{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {activeSection === 'contact' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Mail className="w-8 h-8 text-blue-400" />
                        Questions About Our Refund Policy?
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        If you have any questions about our refund policy or need assistance with a refund request, please don't hesitate to contact us:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                          <Mail className="w-8 h-8 text-blue-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                          <a href="mailto:support@evanio.com" className="text-blue-300 hover:text-blue-200 underline">
                            support@evanio.com
                          </a>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-lg">
                          <Phone className="w-8 h-8 text-purple-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                          <a href="tel:+8801800000817" className="text-purple-300 hover:text-purple-200 underline">
                            +880 1800 000 817
                          </a>
                        </div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-bold text-white mb-2">Support Hours</h3>
                        <p className="text-white/80">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="border-t border-white/20 pt-8">
                    <p className="text-sm text-white/60 text-center">
                      Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}




