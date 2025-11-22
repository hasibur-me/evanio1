import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { FileText, Scale, AlertTriangle, CheckCircle2, Shield, CreditCard, User, Lock, Sparkles, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance', icon: CheckCircle2 },
    { id: 'services', title: 'Services', icon: FileText },
    { id: 'accounts', title: 'User Accounts', icon: User },
    { id: 'payments', title: 'Payments', icon: CreditCard },
    { id: 'intellectual', title: 'Intellectual Property', icon: Shield },
    { id: 'liability', title: 'Liability', icon: AlertTriangle },
    { id: 'termination', title: 'Termination', icon: Lock },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  return (
    <GlassBackground>
      <Helmet>
        <title>Terms of Service | Evanio</title>
        <meta name="description" content="Evanio's Terms of Service. Read our terms and conditions for using our business services platform. Understand your rights and obligations." />
        <meta property="og:title" content="Terms of Service | Evanio" />
        <meta property="og:description" content="Evanio's Terms of Service. Read our terms and conditions for using our business services platform." />
      </Helmet>
      <Header />
      <div className="min-h-screen pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-lg">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Please read these terms carefully before using our services. By using Evanio, you agree to be bound by these terms.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">Legally Binding</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/90">Clear & Transparent</span>
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
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-white/30 text-white'
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
                  {/* Acceptance */}
                  {activeSection === 'acceptance' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                        Acceptance of Terms
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        By accessing and using Evanio's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                      <div className="backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">Important Notice</h3>
                            <p className="text-white/90">
                              These Terms of Service constitute a legally binding agreement between you and Evanio. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Agreement</h4>
                          <p className="text-white/80 text-sm">You agree to these terms by using our services</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Updates</h4>
                          <p className="text-white/80 text-sm">Terms may be updated; continued use implies acceptance</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Eligibility</h4>
                          <p className="text-white/80 text-sm">You must be 18+ and legally able to enter contracts</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Compliance</h4>
                          <p className="text-white/80 text-sm">You must comply with all applicable laws and regulations</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {activeSection === 'services' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-400" />
                        Description of Services
                      </h2>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        Evanio provides comprehensive business services including but not limited to:
                      </p>
                      <div className="space-y-4 mb-6">
                        {[
                          'Business Formation and Registration Services',
                          'Website Development and Design',
                          'Logo and Branding Services',
                          'Payment Gateway Setup and Integration',
                          'Social Media Setup and Management',
                          'Digital Marketing Services',
                          'AI Automation and Integration',
                          'Bank Account Opening Assistance',
                          'Business Consultancy and Advisory Services',
                        ].map((service, index) => (
                          <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-white/90">{service}</span>
                          </div>
                        ))}
                      </div>
                      <div className="backdrop-blur-sm bg-blue-500/20 border border-blue-400/30 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Service Availability</h3>
                        <p className="text-white/90">
                          We reserve the right to modify, suspend, or discontinue any service at any time with or without notice. We do not guarantee that our services will be available at all times or that they will be error-free.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* User Accounts */}
                  {activeSection === 'accounts' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <User className="w-8 h-8 text-purple-400" />
                        User Accounts and Responsibilities
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Account Creation</h3>
                          <p className="text-white/90 mb-4">To use our services, you must create an account. You agree to:</p>
                          <ul className="space-y-2 text-white/80 list-none pl-0">
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Provide accurate, current, and complete information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Maintain and update your information as necessary</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Maintain the security of your account credentials</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Accept responsibility for all activities under your account</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Prohibited Activities</h3>
                          <p className="text-white/90 mb-4">You agree not to:</p>
                          <ul className="space-y-2 text-white/80 list-none pl-0">
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span>Use our services for any illegal or unauthorized purpose</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span>Violate any laws in your jurisdiction</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span>Interfere with or disrupt our services or servers</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span>Attempt to gain unauthorized access to any part of our services</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span>Transmit any viruses, malware, or harmful code</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payments */}
                  {activeSection === 'payments' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-green-400" />
                        Payment Terms
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Payment Processing</h3>
                          <p className="text-white/90 mb-4">All payments are processed securely through Stripe. By making a payment, you agree to:</p>
                          <ul className="space-y-2 text-white/80 list-none pl-0">
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Pay all fees associated with your selected services</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Provide accurate payment information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Authorize us to charge your payment method</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Refunds</h3>
                          <p className="text-white/90 mb-4">
                            Refund policies are outlined in our{' '}
                            <Link to="/refund-policy" className="text-blue-300 hover:text-blue-200 underline">
                              Refund Policy
                            </Link>
                            . Generally:
                          </p>
                          <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                            <ul className="space-y-2 text-white/80 list-none pl-0">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span>30-day money-back guarantee for eligible services</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span>Refunds processed within 5-7 business days</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span>No hidden fees or cancellation charges</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Pricing</h3>
                          <p className="text-white/90">
                            We reserve the right to change our pricing at any time. Price changes will not affect orders already placed. All prices are displayed in USD unless otherwise stated.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Intellectual Property */}
                  {activeSection === 'intellectual' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-yellow-400" />
                        Intellectual Property Rights
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Our Intellectual Property</h3>
                          <p className="text-white/90 mb-4">
                            All content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Evanio and are protected by copyright, trademark, and other intellectual property laws.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Your Content</h3>
                          <p className="text-white/90 mb-4">
                            You retain ownership of any content you submit to us. By submitting content, you grant us a license to use, modify, and display that content solely for the purpose of providing our services to you.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Work Product</h3>
                          <p className="text-white/90 mb-4">
                            Upon full payment, you will receive ownership rights to the work product created specifically for you, subject to any third-party licenses or restrictions.
                          </p>
                        </div>
                        <div className="backdrop-blur-sm bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">Prohibited Use</h3>
                              <p className="text-white/90">
                                You may not copy, reproduce, distribute, or create derivative works from our services without our express written permission.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Liability */}
                  {activeSection === 'liability' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        Limitation of Liability
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Disclaimer of Warranties</h3>
                          <p className="text-white/90 mb-4">
                            Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or completely secure.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Limitation of Liability</h3>
                          <p className="text-white/90 mb-4">
                            To the maximum extent permitted by law, Evanio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Maximum Liability</h3>
                          <p className="text-white/90 mb-4">
                            Our total liability to you for any claims arising from or related to our services shall not exceed the amount you paid to us in the 12 months preceding the claim.
                          </p>
                        </div>
                        <div className="backdrop-blur-sm bg-red-500/20 border border-red-400/30 rounded-lg p-6">
                          <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">Important Legal Notice</h3>
                              <p className="text-white/90">
                                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability. In such jurisdictions, our liability will be limited to the fullest extent permitted by applicable law.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Termination */}
                  {activeSection === 'termination' && (
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
                        <Lock className="w-8 h-8 text-purple-400" />
                        Termination
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Termination by You</h3>
                          <p className="text-white/90 mb-4">
                            You may terminate your account at any time by contacting us or using the account deletion feature in your dashboard settings.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Termination by Us</h3>
                          <p className="text-white/90 mb-4">
                            We reserve the right to suspend or terminate your account immediately, without prior notice, if you violate these Terms of Service or engage in any fraudulent, illegal, or harmful activity.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-3">Effect of Termination</h3>
                          <p className="text-white/90 mb-4">
                            Upon termination, your right to use our services will immediately cease. We may delete your account and data, subject to our data retention policies and legal obligations.
                          </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <h3 className="text-lg font-bold text-white mb-2">Surviving Provisions</h3>
                          <p className="text-white/80">
                            Sections relating to intellectual property, limitation of liability, and dispute resolution shall survive termination of these terms.
                          </p>
                        </div>
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
                        If you have any questions about these Terms of Service, please contact us:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg">
                          <Mail className="w-8 h-8 text-blue-400 mb-3" />
                          <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                          <a href="mailto:legal@evanio.com" className="text-blue-300 hover:text-blue-200 underline">
                            legal@evanio.com
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
                          <strong className="text-white">Response Time:</strong> We aim to respond to all legal inquiries within 48 hours.
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


