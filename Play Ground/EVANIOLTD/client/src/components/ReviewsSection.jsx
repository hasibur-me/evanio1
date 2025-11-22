import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { Button } from './ui/Button';

const reviews = [
  {
    name: 'Rahman',
    rating: 5,
    subtitle: 'Verified Customer',
    description: '"Super Fast Service!!! I got all the documents within 1 business day. They were very helpful throughout the process. Highly Recommended!!!"'
  },
  {
    name: 'A H M Kamal',
    rating: 5,
    subtitle: 'Verified Customer',
    description: '"Best of Luck. Very efficient and fast service. Provided all documents within short time."'
  },
  {
    name: 'Tanbir Khasru',
    rating: 5,
    subtitle: 'Verified Customer',
    description: '"Excellent services from them. Very supportive and committed to their duties."'
  },
  {
    name: 'Sarah Johnson',
    rating: 5,
    subtitle: 'Verified Customer',
    description: '"Amazing experience! The team was professional and responsive. Got everything I needed quickly."'
  },
  {
    name: 'Michael Chen',
    rating: 5,
    subtitle: 'Verified Customer',
    description: '"Outstanding service quality. They delivered exactly what was promised and more. Highly satisfied!"'
  }
];

export const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3); // desktop
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2); // tablet
      } else {
        setVisibleCards(1); // mobile
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCards);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - visibleCards));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + visibleCards));
  };

  const handleDotClick = (dotIndex) => {
    setCurrentIndex(dotIndex * visibleCards);
  };

  const getDotsCount = () => {
    return Math.ceil(reviews.length / visibleCards);
  };

  const currentDotIndex = Math.floor(currentIndex / visibleCards);

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reviews From{' '}
            <span className="inline-flex items-center gap-1">
              <Star className="w-8 h-8 md:w-10 md:h-10 fill-green-500 text-green-500 inline" />
              Trustpilot
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Trusted Worldwide:{' '}
            <span className="font-semibold text-[#ff7a00]">Serving 300+ Companies</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-8 md:mb-12">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full p-2 md:p-3 shadow-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-8 md:mx-12 lg:mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCards} + ${visibleCards > 1 ? '1.5rem' : '0rem'})))`
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{
                    width: visibleCards === 1 ? '100%' : visibleCards === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)'
                  }}
                >
                  <ReviewCard
                    name={review.name}
                    rating={review.rating}
                    subtitle={review.subtitle}
                    description={review.description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full p-2 md:p-3 shadow-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mb-8 md:mb-12">
          {[...Array(getDotsCount())].map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`
                rounded-full transition-all duration-300
                ${index === currentDotIndex
                  ? 'bg-white/90 backdrop-blur-sm w-6 md:w-8 h-2 md:h-2.5'
                  : 'bg-white/40 hover:bg-white/60 w-2 h-2 md:w-2.5 md:h-2.5 backdrop-blur-sm'
                }
              `}
              aria-label={`Go to review page ${index + 1}`}
            />
          ))}
        </div>

        {/* Review Us Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-2 border-green-500/80 backdrop-blur-xl bg-green-500/20 text-white hover:bg-green-500/30 rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium inline-flex items-center gap-2 shadow-lg"
            onClick={() => window.open('https://www.trustpilot.com/review/evanioltd.com', '_blank')}
          >
            Review us on{' '}
            <span className="inline-flex items-center gap-1">
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              Trustpilot
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

