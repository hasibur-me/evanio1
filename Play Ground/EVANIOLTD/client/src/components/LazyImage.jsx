import { useState, useRef, useEffect } from 'react';

export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onError = null,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;
    const currentImg = imgRef.current;

    if (currentImg && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
              };
              img.onerror = () => {
                setHasError(true);
                if (onError) {
                  onError({ target: currentImg });
                } else {
                  // Default fallback
                  setImageSrc('https://via.placeholder.com/400x300/3b82f6/ffffff?text=Image+Not+Found');
                }
              };
              observer.unobserve(currentImg);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(currentImg);
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src);
    }

    return () => {
      if (observer && currentImg) {
        observer.unobserve(currentImg);
      }
    };
  }, [src, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'} transition-all duration-300`}
      loading="lazy"
      {...props}
    />
  );
};


