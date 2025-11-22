import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Shield, Lock, Eye, FileText, Database, UserCheck, AlertCircle, CheckCircle2, Sparkles, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: FileText },
    { id: 'data-collection', title: 'Data Collection', icon: Database },
    { id: 'data-use', title: 'How We Use Data', icon: Eye },
    { id: 'data-sharing', title: 'Data Sharing', icon: UserCheck },
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'rights', title: 'Your Rights', icon: Shield },
    { id: 'cookies', title: 'Cookies', icon: FileText },
    { id: 'contact', title: 'Contact Us', icon: Mail },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Privacy Policy | Evanio</title>
        <meta name="description" content="Evanio's comprehensive Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy is our priority." />
        <meta property="og:title" content="Privacy Policy | Evanio" />
        <meta property="og:description" content="Evanio's comprehensive Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <Header />
      <div className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/90">Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/90">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
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
                            ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/30 text-white'
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
                        <FileText className="w-8 h-8 text-blue-400" />
                        Overview
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        At Evanio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                      </p>
                      <div className="backdrop-blur-sm bg-blue-500/20 border border-blue-400/30 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-4">
                          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">Important Notice</h3>
                            <p className="text-white/90">
                              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Information We Collect</h4>
                          <p className="text-white/80 text-sm">Personal information, usage data, and cookies</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">How We Use It</h4>
                          <p className="text-white/80 text-sm">Service delivery, communication, and improvements</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Data Protection</h4>
                          <p className="text-white/80 text-sm">Encryption, secure storage, and access controls</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Your Rights</h4>
                          <p className="text-white/80 text-sm">Access, update, delete, and export your data</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data Collection */}
                  {activeSection === 'data-collection' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Database className="w-8 h-8 text-purple-400" />
                        Information We Collect
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-blue-400" />
                            Personal Information
                          </h3>
                          <p className="text-white/90 mb-4">We collect information that you provide directly to us, including:</p>
                          <ul className="space-y-2 text-white/80 list-none pl-0">
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span><strong className="text-white">Name and Contact Information:</strong> Your full name, email address, phone number, and mailing address</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span><strong className="text-white">Account Information:</strong> Username, password (encrypted), and profile preferences</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span><strong className="text-white">Business Information:</strong> Company name, business type, registration details, and tax information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span><strong className="text-white">Payment Information:</strong> Billing address, payment method details (processed securely through Stripe)</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-purple-400" />
                            Usage Data
                          </h3>
                          <p className="text-white/90 mb-4">We automatically collect certain information when you use our services:</p>
                          <ul className="space-y-2 text-white/80 list-none pl-0">
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Device information (IP address, browser type, operating system)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Usage patterns and service interactions</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Log files and analytics data</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* How We Use Data */}
                  {activeSection === 'data-use' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Eye className="w-8 h-8 text-blue-400" />
                        How We Use Your Information
                      </h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                            <h3 className="text-lg font-bold text-white mb-3">Service Delivery</h3>
                            <p className="text-white/80 text-sm">Process orders, provide services, and manage your account</p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-lg">
                            <h3 className="text-lg font-bold text-white mb-3">Communication</h3>
                            <p className="text-white/80 text-sm">Send updates, notifications, and respond to inquiries</p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-white/20 rounded-lg">
                            <h3 className="text-lg font-bold text-white mb-3">Improvements</h3>
                            <p className="text-white/80 text-sm">Analyze usage to enhance our services and user experience</p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg">
                            <h3 className="text-lg font-bold text-white mb-3">Legal Compliance</h3>
                            <p className="text-white/80 text-sm">Meet legal obligations and protect our rights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data Sharing */}
                  {activeSection === 'data-sharing' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <UserCheck className="w-8 h-8 text-green-400" />
                        Data Sharing and Disclosure
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        We do not sell your personal information. We may share your information only in the following circumstances:
                      </p>
                      <div className="space-y-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Service Providers</h3>
                          <p className="text-white/80">We share information with trusted third-party service providers who assist us in operating our services (e.g., payment processors, email services, hosting providers).</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Legal Requirements</h3>
                          <p className="text-white/80">We may disclose information if required by law, court order, or government regulation.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Business Transfers</h3>
                          <p className="text-white/80">In the event of a merger, acquisition, or sale, your information may be transferred to the new entity.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">With Your Consent</h3>
                          <p className="text-white/80">We may share information with your explicit consent for specific purposes.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security */}
                  {activeSection === 'security' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Lock className="w-8 h-8 text-yellow-400" />
                        Data Security
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        We implement industry-standard security measures to protect your personal information:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg">
                          <Lock className="w-8 h-8 text-green-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Encryption</h3>
                          <p className="text-white/80 text-sm">All data is encrypted in transit and at rest using industry-standard protocols</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                          <Shield className="w-8 h-8 text-blue-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Access Controls</h3>
                          <p className="text-white/80 text-sm">Strict access controls and authentication mechanisms protect your data</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-lg">
                          <Database className="w-8 h-8 text-purple-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Secure Storage</h3>
                          <p className="text-white/80 text-sm">Data is stored on secure, monitored servers with regular backups</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-white/20 rounded-lg">
                          <Eye className="w-8 h-8 text-pink-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Regular Audits</h3>
                          <p className="text-white/80 text-sm">We conduct regular security audits and vulnerability assessments</p>
                        </div>
                      </div>
                      <div className="backdrop-blur-sm bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">Your Responsibility</h3>
                            <p className="text-white/90">
                              While we take security seriously, you are also responsible for maintaining the confidentiality of your account credentials. Please use strong passwords and do not share your login information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Your Rights */}
                  {activeSection === 'rights' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-400" />
                        Your Privacy Rights
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        You have the following rights regarding your personal information:
                      </p>
                      <div className="space-y-4">
                        {[
                          { title: 'Access', desc: 'Request access to your personal information' },
                          { title: 'Correction', desc: 'Request correction of inaccurate or incomplete data' },
                          { title: 'Deletion', desc: 'Request deletion of your personal information' },
                          { title: 'Portability', desc: 'Request a copy of your data in a portable format' },
                          { title: 'Objection', desc: 'Object to processing of your personal information' },
                          { title: 'Restriction', desc: 'Request restriction of processing your data' },
                        ].map((right, index) => (
                          <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1">{right.title}</h3>
                                <p className="text-white/80">{right.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-6 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                        <p className="text-white/90">
                          To exercise any of these rights, please contact us at{' '}
                          <a href="mailto:privacy@evanio.com" className="text-blue-300 hover:text-blue-200 underline">
                            privacy@evanio.com
                          </a>
                          . We will respond to your request within 30 days.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cookies */}
                  {activeSection === 'cookies' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        Cookies and Tracking Technologies
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        We use cookies and similar tracking technologies to enhance your experience on our platform:
                      </p>
                      <div className="space-y-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Essential Cookies</h3>
                          <p className="text-white/80">Required for the website to function properly (authentication, security)</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Analytics Cookies</h3>
                          <p className="text-white/80">Help us understand how visitors interact with our website</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Preference Cookies</h3>
                          <p className="text-white/80">Remember your preferences and settings</p>
                        </div>
                      </div>
                      <div className="mt-6 p-6 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                        <p className="text-white/90">
                          You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our services.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {activeSection === 'contact' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Mail className="w-8 h-8 text-blue-400" />
                        Contact Us
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                          <Mail className="w-8 h-8 text-blue-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                          <a href="mailto:privacy@evanio.com" className="text-blue-300 hover:text-blue-200 underline">
                            privacy@evanio.com
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
                      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/80 text-sm">
                          <strong className="text-white">Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours.
                        </p>
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

