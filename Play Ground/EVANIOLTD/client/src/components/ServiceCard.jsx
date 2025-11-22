import { cn } from '../utils/cn';

export const ServiceCard = ({ icon: Icon, title, description, className }) => {
  return (
    <div
      className={cn(
        'p-6 hover:shadow-md transition-all duration-300',
        className
      )}
    >
      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-white/30">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white/80 leading-relaxed">{description}</p>
    </div>
  );
};

