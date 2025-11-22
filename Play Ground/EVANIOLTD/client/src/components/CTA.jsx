import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { Button } from './ui/Button';
import { ShieldCheck } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <GlassCard variant="cta" className="p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Build your business the smart way with Evanio
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses that chose Evanio for their complete business solution needs.
          </p>
          
          <Link to="/register">
            <Button 
              size="lg" 
              className="rounded-full px-10 py-4 text-lg font-medium backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 shadow-lg"
            >
              Get Started Today
            </Button>
          </Link>
        </GlassCard>
      </div>
    </section>
  );
};

