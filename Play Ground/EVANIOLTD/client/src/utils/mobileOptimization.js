// Mobile optimization utilities

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};

/**
 * Check if device is tablet
 */
export const isTablet = () => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is touch-enabled
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Optimize touch interactions
 */
export const optimizeTouchInteractions = () => {
  if (isTouchDevice()) {
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    
    // Increase tap target sizes for mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        button, a, [role="button"] {
          min-height: 44px;
          min-width: 44px;
        }
        
        input, textarea, select {
          font-size: 16px; /* Prevents zoom on iOS */
        }
      }
      
      .touch-device * {
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);
  }
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

