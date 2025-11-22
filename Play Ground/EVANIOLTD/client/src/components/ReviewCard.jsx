import { Star } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '../utils/cn';

export const ReviewCard = ({ name, rating = 5, subtitle, description, className }) => {
  return (
    <GlassCard
      variant="service"
      className={cn(
        'p-6 md:p-8 h-full flex flex-col',
        className
      )}
    >
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-green-500 text-green-500"
              fill="currentColor"
            />
          ))}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        {subtitle && (
          <p className="text-sm text-white/70">{subtitle}</p>
        )}
      </div>
      <p className="text-white/90 leading-relaxed flex-grow">
        {description}
      </p>
    </GlassCard>
  );
};

