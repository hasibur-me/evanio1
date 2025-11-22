import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { MoneyBackGuarantee } from '../components/MoneyBackGuarantee';
import { SimplifyingPath } from '../components/SimplifyingPath';
import { ReviewsSection } from '../components/ReviewsSection';
import { CTA } from '../components/CTA';
import { GlassBackground } from '../components/GlassBackground';
import { Helmet } from 'react-helmet-async';
import { StatsSection } from '../components/StatsSection';
import { SocialProofWidget } from '../components/SocialProof';
import { BrandLogoSlider } from '../components/BrandLogoSlider';

export default function Homepage() {
  return (
    <GlassBackground>
      <Helmet>
        <title>Evanio - Launch & Grow Your Business | Complete Business Solutions</title>
        <meta name="description" content="Launch and grow your business with Evanio. We offer business formation, website development, branding, payment setup, and full business growth solutions. Trusted by 300+ companies worldwide." />
        <meta name="keywords" content="business formation, company registration, website development, branding, payment gateway setup, business solutions, startup services" />
        <meta property="og:title" content="Evanio - Launch & Grow Your Business" />
        <meta property="og:description" content="Complete business solutions to help you launch, grow, and succeed. Trusted by 300+ companies worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      <Header />
      <Hero />
      <StatsSection />
      <Services />
      <WhyChooseUs />
      <MoneyBackGuarantee />
      <SimplifyingPath />
      <ReviewsSection />
      <CTA />
      <Footer />
    </GlassBackground>
  );
}
