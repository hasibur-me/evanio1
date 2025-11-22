import { GlassCard } from './GlassCard';
import { Button } from './ui/Button';
import { ShieldCheck, CheckCircle2, Award, Clock, Sparkles, ArrowRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingBadges = [
  {
    icon: ShieldCheck,
    text: '100% Secure',
    position: 'top-left',
    color: 'bg-green-500/20',
    border: 'border-green-400/50',
    iconColor: 'text-green-300',
  },
  {
    icon: CheckCircle2,
    text: 'Trusted',
    position: 'top-right',
    color: 'bg-blue-500/20',
    border: 'border-blue-400/50',
    iconColor: 'text-blue-300',
  },
  {
    icon: Award,
    text: 'Guaranteed',
    position: 'bottom-left',
    color: 'bg-purple-500/20',
    border: 'border-purple-400/50',
    iconColor: 'text-purple-300',
  },
  {
    icon: Clock,
    text: 'Fast Delivery',
    position: 'bottom-right',
    color: 'bg-orange-500/20',
    border: 'border-orange-400/50',
    iconColor: 'text-orange-300',
  },
];

const guaranteeFeatures = [
  {
    icon: ShieldCheck,
    title: 'Full Refund Guarantee',
    description: 'Get 100% of your money back if we don\'t deliver as promised',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-400/50',
  },
  {
    icon: Clock,
    title: '30-Day Window',
    description: 'Plenty of time to review and request a refund if needed',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-400/50',
  },
  {
    icon: Zap,
    title: 'No Questions Asked',
    description: 'Simple, straightforward refund process with no hidden conditions',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-400/50',
  },
  {
    icon: Star,
    title: 'Transparent Policy',
    description: 'Clear terms and conditions - no surprises, no hidden fees',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-400/50',
  },
];

export const MoneyBackGuarantee = () => {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative Gradient Overlays */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            {/* Header Section */}
            <div className="text-center mb-12 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full mb-6">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-semibold">Our Commitment to You</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Money-Back
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                  Guarantee Service
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                We take all the risks to ensure your company is ready to grow
              </p>
            </div>

            <div className="relative z-10">
              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      Our promise is straightforward: receive all the required documents within the agreed timeframe, or get your money back in full. This guarantee aligns with our refund policy.
                    </p>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                      We stand behind our services with confidence. If we don't deliver what we promise, you get a full refund - no questions asked.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link to="/refund-policy">
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-4 text-base font-medium backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-500/50 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg flex items-center gap-2 group"
                      >
                        <span>Learn More About Our Policy</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Column - Image Card with Floating Badges */}
                <div className="relative">
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-2xl">
                    {/* Placeholder Image */}
                    <img
                      src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                      alt="Two professionals working on a laptop"
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback Gradient Background */}
                    <div 
                      className="hidden w-full h-64 md:h-80 items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
                    >
                      <div className="text-center p-8">
                        <ShieldCheck className="w-16 h-16 text-white/40 mx-auto mb-4" />
                        <p className="text-white/60 text-sm">Professional Team at Work</p>
                      </div>
                    </div>

                    {/* Floating Badges */}
                    {floatingBadges.map((badge, index) => {
                      const Icon = badge.icon;
                      const positionClasses = {
                        'top-left': 'top-3 left-3 md:top-4 md:left-4',
                        'top-right': 'top-3 right-3 md:top-4 md:right-4',
                        'bottom-left': 'bottom-3 left-3 md:bottom-4 md:left-4',
                        'bottom-right': 'bottom-3 right-3 md:bottom-4 md:right-4',
                      };

                      return (
                        <div
                          key={index}
                          className={`absolute ${positionClasses[badge.position]} backdrop-blur-xl ${badge.color} border-2 ${badge.border} rounded-full px-4 md:px-5 py-2.5 shadow-2xl transform hover:scale-110 transition-all duration-300 z-20`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${badge.iconColor}`} />
                            <span className="text-sm md:text-base font-bold text-white whitespace-nowrap">
                              {badge.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 backdrop-blur-sm bg-green-500/20 border border-green-400/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-green-300 mb-1">100%</div>
                      <div className="text-xs md:text-sm text-white/70 font-medium">Money-Back</div>
                    </div>
                    <div className="text-center p-4 backdrop-blur-sm bg-blue-500/20 border border-blue-400/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-1">24/7</div>
                      <div className="text-xs md:text-sm text-white/70 font-medium">Support</div>
                    </div>
                    <div className="text-center p-4 backdrop-blur-sm bg-purple-500/20 border border-purple-400/50 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold text-purple-300 mb-1">30</div>
                      <div className="text-xs md:text-sm text-white/70 font-medium">Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {guaranteeFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <GlassCard
                      key={index}
                      variant="default"
                      className="p-6 hover:scale-105 transition-all duration-300 group"
                    >
                      <div className={`w-14 h-14 ${feature.bgColor} ${feature.borderColor} border-2 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
