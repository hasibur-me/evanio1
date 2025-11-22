import { useEffect, useRef } from 'react';

const brandLogos = [
  // Payment Processors
  { id: 1, name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/635bff', url: 'https://stripe.com' },
  { id: 2, name: 'PayPal', logo: 'https://cdn.simpleicons.org/paypal/00457C', url: 'https://paypal.com' },
  { id: 3, name: 'Wise', logo: 'https://cdn.simpleicons.org/wise/9FE870', url: 'https://wise.com' },
  { id: 4, name: 'Payoneer', logo: 'https://cdn.simpleicons.org/payoneer/FF4800', url: 'https://payoneer.com' },
  { id: 5, name: '2Checkout', logo: 'https://logo.clearbit.com/2checkout.com', url: 'https://2checkout.com' },
  { id: 6, name: 'Authorize.Net', logo: 'https://logo.clearbit.com/authorize.net', url: 'https://authorize.net' },
  { id: 7, name: 'Razorpay', logo: 'https://cdn.simpleicons.org/razorpay/0C2451', url: 'https://razorpay.com' },
  { id: 8, name: 'Paddle', logo: 'https://cdn.simpleicons.org/paddle/2200ff', url: 'https://paddle.com' },
  // Banking & Financial Services
  { id: 9, name: 'Mercury', logo: 'https://logo.clearbit.com/mercury.com', url: 'https://mercury.com' },
  { id: 10, name: 'Relay', logo: 'https://logo.clearbit.com/relayfi.com', url: 'https://relayfi.com' },
  { id: 11, name: 'Novo', logo: 'https://logo.clearbit.com/novo.co', url: 'https://novo.co' },
  { id: 12, name: 'Wise Business', logo: 'https://cdn.simpleicons.org/wise/9FE870', url: 'https://wise.com/business' },
  { id: 13, name: 'Payoneer Business', logo: 'https://cdn.simpleicons.org/payoneer/FF4800', url: 'https://payoneer.com/business' },
  { id: 14, name: 'Revolut Business', logo: 'https://cdn.simpleicons.org/revolut/0075EB', url: 'https://revolut.com/business' },
  { id: 15, name: 'Monzo Business', logo: 'https://cdn.simpleicons.org/monzo/14233C', url: 'https://monzo.com/business' },
  { id: 16, name: 'Airwallex', logo: 'https://logo.clearbit.com/airwallex.com', url: 'https://airwallex.com' },
  // Tech & Hosting
  { id: 17, name: 'Google', logo: 'https://cdn.simpleicons.org/google/4285F4', url: 'https://google.com' },
  { id: 18, name: 'Namecheap', logo: 'https://cdn.simpleicons.org/namecheap/DE3723', url: 'https://namecheap.com' },
  { id: 19, name: 'Hostinger', logo: 'https://cdn.simpleicons.org/hostinger/673DE6', url: 'https://hostinger.com' },
  { id: 20, name: 'GoDaddy', logo: 'https://cdn.simpleicons.org/godaddy/1BDBDB', url: 'https://godaddy.com' },
];

export const BrandLogoSlider = () => {
  const sliderRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const scrollInterval = 16; // ~60fps

    const scroll = () => {
      if (slider) {
        scrollAmount += scrollSpeed;
        slider.style.transform = `translateX(-${scrollAmount}px)`;

        // Reset when scrolled past the duplicate set
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-sm text-white/70">
            We partner with the world's most innovative companies
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none"></div>

          <div
            ref={sliderRef}
            className="flex items-center gap-8 md:gap-12"
            style={{ width: 'fit-content' }}
          >
            {duplicatedLogos.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-32 h-16 md:w-40 md:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  title={brand.name}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const parent = e.target.parentElement;
                      if (parent && !parent.querySelector('span')) {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = 'text-white/70 text-sm font-medium text-center';
                        fallback.textContent = brand.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

