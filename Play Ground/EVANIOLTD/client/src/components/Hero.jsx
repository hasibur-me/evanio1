import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/Button';

const features = [
  { icon: CheckCircle2, text: 'Fast Setup' },
  { icon: ShieldCheck, text: '100% Secure' },
  { icon: Zap, text: '24/7 Support' },
];

export const Hero = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <GlassCard variant="hero" className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6 text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-semibold text-sm">Trusted by 300+ Companies</span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Launch & Grow Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Business with Evanio
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl">
                Business formation, website development, branding, payment setup, and full business growth solutions.
              </p>

              {/* Quick Features */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <Icon className="w-4 h-4 text-green-400" />
                      <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-4 text-lg font-medium backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-500/50 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg flex items-center gap-2 group"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#services">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 py-4 text-lg font-medium border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    View Services
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative z-10">
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                <div className="relative">
                  <Rocket className="w-full h-96 text-white/80" strokeWidth={1.5} style={{ animation: 'float 3s ease-in-out infinite' }} />
                </div>
                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-pink-400/60 rounded-full animate-ping delay-2000"></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

