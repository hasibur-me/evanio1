import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

const trustpilotReviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    rating: 5,
    date: '2 days ago',
    review: 'Evanio made starting my business incredibly smooth. The team was professional, responsive, and handled everything from formation to payment setup. Highly recommend!',
    service: 'Business Formation',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: '5 days ago',
    review: 'The website they built for us exceeded all expectations. Modern design, fast loading, and perfect SEO. Our traffic increased by 300% in the first month!',
    service: 'Website Development',
    verified: true,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    rating: 5,
    date: '1 week ago',
    review: 'Our new brand identity perfectly captures our vision. The logo design process was collaborative and the final result is stunning. Couldn\'t be happier!',
    service: 'Logo & Branding',
    verified: true,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    rating: 5,
    date: '1 week ago',
    review: 'Setting up payment processing was a nightmare until I found Evanio. They integrated multiple gateways, handled all the compliance, and we were live in days!',
    service: 'Payment Gateway Setup',
    verified: true,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    rating: 5,
    date: '2 weeks ago',
    review: 'Their digital marketing strategy transformed our business. We saw a 250% ROI in the first quarter. The team is knowledgeable, creative, and results-driven.',
    service: 'Digital Marketing',
    verified: true,
  },
  {
    id: 6,
    name: 'James Wilson',
    rating: 5,
    date: '2 weeks ago',
    review: 'The AI automation they set up saved us 20+ hours per week. Our workflows are now streamlined, and we can focus on growth instead of repetitive tasks.',
    service: 'AI Automation',
    verified: true,
  },
  {
    id: 7,
    name: 'Rachel Brown',
    rating: 5,
    date: '3 weeks ago',
    review: 'Outstanding service from start to finish. They helped us form our LLC, set up our website, and get our payment system running. Everything was done on time and perfectly.',
    service: 'Business Formation',
    verified: true,
  },
  {
    id: 8,
    name: 'Thomas Lee',
    rating: 5,
    date: '3 weeks ago',
    review: 'Professional, efficient, and results-oriented. The team at Evanio understands business needs and delivers solutions that actually work. Worth every penny!',
    service: 'Website Development',
    verified: true,
  },
  {
    id: 9,
    name: 'Amanda Garcia',
    rating: 5,
    date: '1 month ago',
    review: 'Best decision we made for our startup. Evanio handled all the complex paperwork, legal requirements, and technical setup. We could focus on building our product.',
    service: 'Business Formation',
    verified: true,
  },
];

export const TrustpilotReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const reviewsPerView = 3; // Number of reviews visible at once
  const totalSlides = Math.ceil(trustpilotReviews.length / reviewsPerView);

  useEffect(() => {
    // Clear any existing interval first
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    // Only start auto-scroll if not paused
    if (!isPaused && totalSlides > 1) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % totalSlides;
          return nextIndex;
        });
      }, 2000); // Auto-slide every 2 seconds
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isPaused, totalSlides]);

  useEffect(() => {
    if (scrollContainerRef.current && totalSlides > 0) {
      const scrollAmount = currentIndex * 100;
      scrollContainerRef.current.style.transform = `translateX(-${scrollAmount}%)`;
    }
  }, [currentIndex, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Reviews From Trustpilot
            </h2>
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            See what our clients are saying about us on Trustpilot
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/90 font-semibold ml-2">5.0</span>
            <span className="text-white/70 text-sm ml-2">({trustpilotReviews.length} reviews)</span>
          </div>
        </div>

        {/* Reviews Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Reviews Container */}
          <div className="overflow-hidden mx-12">
            <div
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${totalSlides * 100}%` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex gap-6 flex-shrink-0"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {trustpilotReviews
                    .slice(slideIndex * reviewsPerView, slideIndex * reviewsPerView + reviewsPerView)
                    .map((review) => (
                      <GlassCard
                        key={review.id}
                        className="p-6 flex-shrink-0 flex flex-col min-w-0"
                        style={{ width: `${100 / reviewsPerView}%` }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-white">{review.name}</h3>
                              {review.verified && (
                                <span className="px-2 py-0.5 bg-green-500/20 border border-green-400/30 rounded text-xs text-green-300">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-xs text-white/60">{review.date}</p>
                          </div>
                          <Quote className="w-8 h-8 text-green-400/50 flex-shrink-0" />
                        </div>

                        {/* Review Text */}
                        <p className="text-white/90 text-sm leading-relaxed mb-4 flex-grow">
                          {review.review}
                        </p>

                        {/* Service Badge */}
                        <div className="mt-auto pt-4 border-t border-white/10">
                          <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                            {review.service}
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-green-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Trustpilot Badge */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm text-white/90 font-medium">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

