import { GlassCard } from './GlassCard';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const floatingBadges = [
  {
    emoji: '🌍',
    text: 'Manage global businesses',
    position: 'top-left',
    color: 'bg-blue-500/20',
    border: 'border-blue-400/50',
  },
  {
    emoji: '📝',
    text: 'Easy to form and setup',
    position: 'middle-left',
    color: 'bg-purple-500/20',
    border: 'border-purple-400/50',
  },
  {
    emoji: '🏆',
    text: 'Enjoy Exclusive Rewards',
    position: 'bottom-right',
    color: 'bg-green-500/20',
    border: 'border-green-400/50',
  },
];

export const SimplifyingPath = () => {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative Gradient Overlays */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm md:text-base font-semibold text-blue-300 mb-2 uppercase tracking-wider">
                    From Launch to Grow
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                    Simplifying Your Path
                  </h2>
                </div>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Don't wait any longer. Join the hundreds of entrepreneurs who have already launched their businesses globally with Evanio.
                </p>

                <div className="pt-4">
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="rounded-full px-6 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Image with Floating Badges */}
              <div className="relative">
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
                  {/* Placeholder Image - Smiling girl holding phone */}
                  <img
                    src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt="Smiling professional holding a phone"
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback Gradient Background */}
                  <div 
                    className="hidden w-full h-64 md:h-80 lg:h-96 items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
                  >
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-white/60 text-sm">Professional with Phone</p>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  {floatingBadges.map((badge, index) => {
                    const positionClasses = {
                      'top-left': 'top-4 left-4 md:top-6 md:left-6',
                      'middle-left': 'top-1/2 -translate-y-1/2 left-4 md:left-6',
                      'bottom-right': 'bottom-4 right-4 md:bottom-6 md:right-6',
                    };

                    return (
                      <div
                        key={index}
                        className={`absolute ${positionClasses[badge.position]} backdrop-blur-xl ${badge.color} border ${badge.border} rounded-full px-3 md:px-4 py-2 shadow-xl transform hover:scale-110 transition-transform duration-300 z-20`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base md:text-lg">{badge.emoji}</span>
                          <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">
                            {badge.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

