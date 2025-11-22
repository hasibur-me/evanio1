import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { allServices } from '../../data/services';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import ThemeToggle from '../ThemeToggle';

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Get theme values or defaults
  const headerBg = theme?.headerBackground || 'bg-white/10';
  const headerBorder = theme?.headerBorder || 'border-white/20';
  const logoImage = theme?.logoImage || '/logo.png'; // Default logo image path

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle scroll effect for sticky header - always show on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show shadow when scrolled
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen]);

  return (
    <header className={cn(
      "backdrop-blur-xl border-b fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300",
      "dark:bg-gray-900/80 border-white/20 dark:border-gray-700/30",
      isScrolled ? "shadow-lg bg-white/20 dark:bg-gray-900/95" : "bg-white/10 dark:bg-gray-900/80",
      headerBg, 
      headerBorder
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="hover:opacity-90 transition-opacity flex items-center"
          >
            <img 
              src={logoImage} 
              alt="Evanio Logo" 
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-white transition-colors font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                ref={buttonRef}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesOpen(!servicesOpen);
                }}
                onMouseEnter={() => setServicesOpen(true)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-label="Services menu"
                type="button"
              >
                Services
                {servicesOpen ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 backdrop-blur-xl bg-purple-900/95 border border-purple-700/50 rounded-2xl shadow-xl overflow-hidden z-[100] min-w-max"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  role="menu"
                >
                  <div className="py-2">
                    {allServices.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.id}
                          to={
                            service.slug === 'business-consultancy' 
                              ? '/service/business-consultancy' 
                              : service.slug === 'business-formation'
                              ? '/service/business-formation'
                              : service.slug === 'bank-account-assistance'
                              ? '/service/bank-account-assistance'
                              : `/service/${service.slug}`
                          }
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-700/50 transition-colors text-white/90 hover:text-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setServicesOpen(false);
                          }}
                          role="menuitem"
                        >
                          <Icon className="w-5 h-5 text-white/70 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm font-medium whitespace-nowrap">{service.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/portfolio" className="text-white/90 hover:text-white transition-colors font-medium">
              Portfolio
            </Link>
            <Link to="/testimonials" className="text-white/90 hover:text-white transition-colors font-medium">
              Testimonials
            </Link>
            <Link to="/reviews" className="text-white/90 hover:text-white transition-colors font-medium">
              Reviews
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium">
              Contact
            </Link>
            <ThemeToggle variant="dropdown" />
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" className="text-white/90 hover:text-white transition-colors font-medium">
                    Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-white/90 hover:text-white transition-colors font-medium">
                    Dashboard
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button 
                    size="sm" 
                    className="rounded-full px-6 backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80 transition-colors p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-2">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link
                to="/"
                className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div className="px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setServicesOpen(!servicesOpen);
                  }}
                  className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors font-medium py-2"
                  aria-expanded={servicesOpen}
                  type="button"
                >
                  <span>Services</span>
                  {servicesOpen ? (
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
                {servicesOpen && (
                  <div className="pl-4 pt-2 space-y-2">
                    {allServices.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.id}
                          to={
                            service.slug === 'business-consultancy' 
                              ? '/service/business-consultancy' 
                              : service.slug === 'business-formation'
                              ? '/service/business-formation'
                              : service.slug === 'bank-account-assistance'
                              ? '/service/bank-account-assistance'
                              : `/service/${service.slug}`
                          }
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setServicesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm">{service.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

                  <Link
                    to="/portfolio"
                    className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/testimonials"
                    className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    to="/reviews"
                    className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reviews
                  </Link>
                  <Link
                    to="/contact"
                    className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
              
              <div className="px-4 py-2 flex items-center gap-4">
                <ThemeToggle variant="dropdown" />
              </div>
              
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="text-white/90 hover:text-white transition-colors font-medium px-4 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4 mt-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/register" className="px-4 py-2" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full rounded-full backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
