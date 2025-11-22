import { cn } from '../utils/cn';

export const GlassCard = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: 'backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl',
    hero: 'backdrop-blur-2xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl',
    service: 'backdrop-blur-xl bg-white/15 dark:bg-gray-800/25 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-lg hover:bg-white/25 dark:hover:bg-gray-800/35 transition-all duration-300',
    cta: 'backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl',
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
};




