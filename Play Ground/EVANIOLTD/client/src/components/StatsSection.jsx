import { GlassCard } from './GlassCard';
import { Users, Building2, Award, TrendingUp, Rocket, Globe, CheckCircle2, Zap } from 'lucide-react';

const stats = [
  {
    number: '5,000+',
    label: 'Companies Formed',
    icon: Building2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-400/50',
  },
  {
    number: '300+',
    label: 'Active Clients',
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-400/50',
  },
  {
    number: '99.8%',
    label: 'Success Rate',
    icon: Award,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-400/50',
  },
  {
    number: '24/7',
    label: 'Support Available',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-400/50',
  },
  {
    number: '50+',
    label: 'Countries Served',
    icon: Globe,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    borderColor: 'border-pink-400/50',
  },
  {
    number: '15+',
    label: 'Years Experience',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-400/50',
  },
];

export const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={index}
                variant="default"
                className="p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} ${stat.borderColor} border-2 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-white/70 text-xs md:text-sm font-medium">
                  {stat.label}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};


