import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={cn(
        'transition-opacity duration-300',
        transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      )}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
};

export const FadeIn = ({ children, delay = 0, className = '' }) => {
  return (
    <div
      className={cn('animate-fade-in', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => {
  const animations = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    up: 'animate-slide-in-up',
    down: 'animate-slide-in-down',
  };

  return (
    <div
      className={cn(animations[direction], className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ children, delay = 0, className = '' }) => {
  return (
    <div
      className={cn('animate-scale-in', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

