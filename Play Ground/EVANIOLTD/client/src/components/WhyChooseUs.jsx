import { GlassCard } from './GlassCard';
import { 
  DollarSign, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Zap, 
  Globe,
  CheckCircle2,
  Clock,
  Building2,
  CreditCard,
  Palette,
  Sparkles,
  Monitor,
  Rocket
} from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Transparent & Honest Pricing',
    subtitle: 'No hidden fees. Ever.',
    description: 'Our pricing is clean, simple, and structured to protect your trust — not add surprise costs.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Business Compliance',
    subtitle: 'Stay compliant from day one.',
    description: 'We handle all regulatory and legal requirements, ensuring your business stays credible and compliant from day one.',
  },
  {
    icon: UserCheck,
    title: 'Personalized, High-Touch Service',
    subtitle: '1-on-1 guidance tailored to you.',
    description: 'Every client receives tailored, 1-on-1 guidance designed around their unique goals and business model.',
  },
  {
    icon: Award,
    title: 'Expert Professionals, Every Step',
    subtitle: 'World-class quality and precision.',
    description: 'From company formation to branding, payments, banking, and AI automation — our specialists deliver world-class quality and precision.',
  },
  {
    icon: Zap,
    title: 'Fast, Efficient & Seamless Execution',
    subtitle: 'Launch and scale with speed.',
    description: 'We streamline the entire process, helping you launch and scale your business with speed and confidence.',
  },
  {
    icon: Globe,
    title: 'Global Standards, Startup-Friendly Approach',
    subtitle: 'Agency quality, startup accessibility.',
    description: 'High-level agency service quality combined with startup accessibility.',
  },
];

const statusCards = [
  {
    title: 'Company Registration',
    status: 'completed',
    icon: Building2,
  },
  {
    title: 'Website Development',
    status: 'completed',
    icon: Monitor,
  },
  {
    title: 'Payment Gateway Setup',
    status: 'completed',
    icon: CreditCard,
  },
  {
    title: 'Launch & Growth Support',
    subtitle: 'Your Business is Now Go-Live',
    status: 'completed',
    icon: Rocket,
  },
];

const StatusCard = ({ title, subtitle, status, icon: Icon }) => {
  const statusConfig = {
    completed: {
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      border: 'border-green-400/50',
      dot: 'bg-green-400',
      label: 'Completed',
      icon: CheckCircle2,
    },
    'in-progress': {
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      border: 'border-blue-400/50',
      dot: 'bg-blue-400',
      label: 'In Progress',
      icon: Clock,
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <GlassCard variant="default" className="p-4 backdrop-blur-sm bg-white/15 border border-white/25 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center border ${config.border}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
            {subtitle && (
              <p className="text-xs text-white/70 mb-2">{subtitle}</p>
            )}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 ${config.dot} rounded-full animate-pulse`}></div>
              <span className={`text-xs ${config.color} font-medium`}>{config.label}</span>
            </div>
          </div>
        </div>
        <StatusIcon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
      </div>
    </GlassCard>
  );
};

export const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose EVANIO
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Because your business deserves exceptional execution, transparent pricing, and a partnership built on trust.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={index} variant="default" className="p-6 hover:bg-white/25 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                      <Icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-blue-300 font-medium text-sm mb-2">
                        {feature.subtitle}
                      </p>
                      <p className="text-white/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Right Side - Premium Visual Cards */}
          <div className="relative">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
            </div>

            {/* Status Cards Stack */}
            <div className="space-y-6">
              <GlassCard variant="cta" className="p-8 text-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <Sparkles className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Your Business Journey
                  </h3>
                  <p className="text-white/70 mb-6">
                    Track your progress with real-time status updates
                  </p>
                  
                  {/* Business Journey Image/Illustration */}
                  <div className="mt-6 mb-4 relative">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20">
                      {/* Image Placeholder - Replace with your image URL */}
                      <img
                        src="/images/business-journey.svg"
                        alt="Business Journey Progress Visualization"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to animated illustration if image not found
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      
                      {/* Fallback Animated Illustration */}
                      <div className="absolute inset-0 flex items-center justify-center p-6" style={{ display: 'none' }}>
                        <div className="w-full space-y-4">
                          {/* Progress Steps */}
                          <div className="flex items-center justify-between relative">
                            {/* Progress Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 transform -translate-y-1/2"></div>
                            <div className="absolute top-1/2 left-0 w-2/3 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transform -translate-y-1/2"></div>
                            
                            {/* Step 1 */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center border-2 border-green-400 shadow-lg">
                                <CheckCircle2 className="w-6 h-6 text-green-300" />
                              </div>
                              <span className="text-xs text-white/70 mt-2">Start</span>
                            </div>
                            
                            {/* Step 2 */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center border-2 border-green-400 shadow-lg">
                                <CheckCircle2 className="w-6 h-6 text-green-300" />
                              </div>
                              <span className="text-xs text-white/70 mt-2">Build</span>
                            </div>
                            
                            {/* Step 3 */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg animate-pulse">
                                <Clock className="w-6 h-6 text-blue-300" />
                              </div>
                              <span className="text-xs text-white/70 mt-2">Grow</span>
                            </div>
                            
                            {/* Step 4 */}
                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                                <Award className="w-6 h-6 text-white/40" />
                              </div>
                              <span className="text-xs text-white/40 mt-2">Scale</span>
                            </div>
                          </div>
                          
                          {/* Journey Visualization */}
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                                  style={{ animationDelay: `${i * 200}ms` }}
                                ></div>
                              ))}
                            </div>
                            <span className="text-xs text-white/60 mx-2">→</span>
                            <div className="flex gap-1">
                              {[...Array(2)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                                  style={{ animationDelay: `${(i + 3) * 200}ms` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Elements Overlay */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-purple-400/40 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Floating Status Cards */}
              {statusCards.map((card, index) => (
                <div
                  key={index}
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <StatusCard
                    title={card.title}
                    subtitle={card.subtitle}
                    status={card.status}
                    icon={card.icon}
                  />
                </div>
              ))}

              {/* Additional Premium Card */}
              <GlassCard variant="default" className="p-6 backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30">
                      <Award className="w-6 h-6 text-green-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Quality Assurance</h4>
                      <p className="text-sm text-white/70">Professional Excellence</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Success Rate</span>
                    <span className="text-green-300 font-bold">99.8%</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

