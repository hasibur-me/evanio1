import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import { ServiceCard } from '../../components/ServiceCard';
import { Button } from '../../components/ui/Button';
import { allServices } from '../../data/services';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-3">What We Do</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Comprehensive business solutions to help you launch, grow, and succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} glass className="p-6 flex flex-col hover:bg-white/15 transition-colors">
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
                      className="w-full rounded-lg px-6 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 inline-flex items-center justify-center whitespace-nowrap"
                    >
                      Learn More
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}


