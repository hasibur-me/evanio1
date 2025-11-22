import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { GlassBackground } from '../GlassBackground';

export const DashboardLayout = ({ children, isAdmin = false, title, subtitle }) => {
  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin={isAdmin} />
        <div className="flex-1 md:ml-64 p-4 md:p-8 pb-20 w-full">
          {(title || subtitle) && (
            <div className="mb-6 md:mb-8">
              {title && <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>}
              {subtitle && <p className="text-white/80 mt-2 text-sm md:text-base">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </GlassBackground>
  );
};


