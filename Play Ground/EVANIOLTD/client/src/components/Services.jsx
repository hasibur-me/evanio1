import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { ServiceCard } from './ServiceCard';
import { Button } from './ui/Button';
import { allServices } from '../data/services';
import { SocialProofWidget } from './SocialProof';

export const Services = () => {
  return (
    <section id="services" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Comprehensive business solutions to help you launch, grow, and succeed
          </p>
          
          {/* Social Proof Widgets - Centered */}
          <div className="flex justify-center mb-12">
            <SocialProofWidget variant="compact" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlassCard 
                key={service.id} 
                variant="service" 
                className="p-6 md:p-8 flex flex-col hover:scale-105 transition-all duration-300 group"
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="bg-transparent border-0 shadow-none p-0 flex-grow"
                />
                <Link 
                  to={
                    service.slug === 'business-consultancy' 
                      ? '/service/business-consultancy' 
                      : service.slug === 'business-formation'
                      ? '/service/business-formation'
                      : service.slug === 'bank-account-assistance'
                      ? '/service/bank-account-assistance'
                      : `/service/${service.slug}`
                  } 
                  className="mt-6"
                >
                  <Button
                    size="sm"
                    className="w-full rounded-full px-6 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:border-transparent transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </Link>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
