import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/Button';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';

const POPUP_VARIANTS = [
  {
    id: 'discount',
    title: 'Wait! Get 20% Off Your First Order',
    description: 'Enter your email and get an exclusive discount code.',
    cta: 'Get My Discount',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'newsletter',
    title: 'Stay Updated with Our Latest News',
    description: 'Subscribe to our newsletter for tips, updates, and exclusive offers.',
    cta: 'Subscribe Now',
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 'promotion',
    title: 'Limited Time Offer!',
    description: 'Get started today and receive a free consultation worth $99.',
    cta: 'Claim Offer',
    color: 'from-purple-500 to-pink-500',
  },
];

export const ExitIntentPopup = ({ variant = 'auto', onClose }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Get logo from theme context
  const logoImage = theme?.logoImage || '/logo.png';

  // Don't show popup on dashboard pages
  const isDashboardPage = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  useEffect(() => {
    // Don't show on dashboard pages
    if (isDashboardPage) return;

    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem('exit_intent_shown');
    if (hasSeenPopup) return;

    // Select variant
    if (variant === 'auto') {
      // A/B testing - randomly select variant
      const randomVariant = POPUP_VARIANTS[Math.floor(Math.random() * POPUP_VARIANTS.length)];
      setSelectedVariant(randomVariant);
    } else {
      const found = POPUP_VARIANTS.find(v => v.id === variant);
      setSelectedVariant(found || POPUP_VARIANTS[0]);
    }

    // Track mouse movement for exit intent
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
        trackEvent('exit_intent_triggered', { variant: selectedVariant?.id });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [variant, selectedVariant, isDashboardPage]);

  const trackEvent = (eventName, data) => {
    if (window.analytics) {
      window.analytics.trackEvent(eventName, data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      // Subscribe to newsletter
      await api.post('/newsletter/subscribe', { email });
      
      trackEvent('exit_intent_conversion', { 
        variant: selectedVariant?.id,
        email: email 
      });

      // Show success message
      alert('Thank you for subscribing! Check your email for your discount code.');
      setIsVisible(false);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
    trackEvent('exit_intent_dismissed', { variant: selectedVariant?.id });
  };

  // Don't render on dashboard pages
  if (isDashboardPage) {
    return null;
  }

  if (!isVisible || !selectedVariant) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 animate-fade-in">
      <GlassCard className="max-w-md w-full p-8 relative border border-white/30 animate-scale-in">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={logoImage} 
              alt="Evanio Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{selectedVariant.title}</h2>
          <p className="text-white/80">{selectedVariant.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isSubmitting ? 'Processing...' : selectedVariant.cta}
          </Button>
        </form>

        <p className="text-xs text-white/50 text-center mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </GlassCard>
    </div>
  );
};

