import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Linkedin, Twitter, Mail, Award, Users, Rocket, Check, Facebook, Instagram, MessageCircle, Youtube } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// CEO & Founder
const ceo = {
  name: 'Hasibur Rahman',
  role: 'CEO & Founder',
  bio: 'Visionary leader with 3+ years of experience in business strategy, technology innovation, and digital transformation. Passionate about helping entrepreneurs and businesses succeed globally.',
  email: 'hello@hasibur.me',
  whatsapp: '+8801800000817',
  facebook: 'https://www.facebook.com/www.Hasibur.me/',
  instagram: 'https://www.instagram.com/hasibur.me/',
  tiktok: 'https://www.tiktok.com/@hasibur.me',
  twitter: 'https://x.com/x_hasibur',
  youtube: 'https://www.youtube.com/@hasibur_me',
  linkedin: 'https://www.linkedin.com/in/hasibur-me/',
  image: '/ceo.png',
};

// Other Team Members (12 members)
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    bio: 'Tech expert specializing in scalable solutions and digital transformation. Leads our technical innovation.',
    email: 'sarah@evanio.com',
    linkedin: 'sarahjohnson',
    twitter: '@sarahjohnson',
    image: null, // Will use placeholder
  },
  {
    name: 'Michael Chen',
    role: 'Head of Business Development',
    bio: 'Dedicated to helping businesses grow and succeed in the digital age. Expert in strategic partnerships.',
    email: 'michael@evanio.com',
    linkedin: 'michaelchen',
    twitter: '@michaelchen',
    image: null,
  },
  {
    name: 'Emily Davis',
    role: 'Head of Customer Success',
    bio: 'Passionate about delivering exceptional customer experiences. Ensures every client achieves their goals.',
    email: 'emily@evanio.com',
    linkedin: 'emilydavis',
    twitter: '@emilydavis',
    image: null,
  },
  {
    name: 'David Wilson',
    role: 'Lead Developer',
    bio: 'Full-stack developer with expertise in modern web technologies. Builds robust and scalable solutions.',
    email: 'david@evanio.com',
    linkedin: 'davidwilson',
    twitter: '@davidwilson',
    image: null,
  },
  {
    name: 'Lisa Anderson',
    role: 'Head of Marketing',
    bio: 'Creative marketer focused on building brands and driving growth. Expert in digital marketing strategies.',
    email: 'lisa@evanio.com',
    linkedin: 'lisanderson',
    twitter: '@lisaanderson',
    image: null,
  },
  {
    name: 'James Martinez',
    role: 'Senior Full-Stack Developer',
    bio: 'Expert in React, Node.js, and cloud infrastructure. Delivers high-performance applications.',
    email: 'james@evanio.com',
    linkedin: 'jamesmartinez',
    twitter: '@jamesmartinez',
    image: null,
  },
  {
    name: 'Rachel Thompson',
    role: 'Head of Design',
    bio: 'Creative designer with a passion for user experience. Creates beautiful and intuitive interfaces.',
    email: 'rachel@evanio.com',
    linkedin: 'rachelthompson',
    twitter: '@rachelthompson',
    image: null,
  },
  {
    name: 'Robert Kim',
    role: 'Senior Backend Developer',
    bio: 'Specializes in API development, database optimization, and system architecture. Ensures reliability.',
    email: 'robert@evanio.com',
    linkedin: 'robertkim',
    twitter: '@robertkim',
    image: null,
  },
  {
    name: 'Amanda White',
    role: 'Head of Operations',
    bio: 'Streamlines processes and ensures operational excellence. Keeps everything running smoothly.',
    email: 'amanda@evanio.com',
    linkedin: 'amandawhite',
    twitter: '@amandawhite',
    image: null,
  },
  {
    name: 'Daniel Brown',
    role: 'Senior Frontend Developer',
    bio: 'Expert in React, Vue, and modern UI frameworks. Creates responsive and accessible interfaces.',
    email: 'daniel@evanio.com',
    linkedin: 'danielbrown',
    twitter: '@danielbrown',
    image: null,
  },
  {
    name: 'Jessica Lee',
    role: 'Head of Finance',
    bio: 'Financial strategist ensuring sustainable growth. Manages budgets and financial planning.',
    email: 'jessica@evanio.com',
    linkedin: 'jessicalee',
    twitter: '@jessicalee',
    image: null,
  },
  {
    name: 'Christopher Taylor',
    role: 'DevOps Engineer',
    bio: 'Expert in CI/CD, cloud infrastructure, and automation. Ensures seamless deployments.',
    email: 'christopher@evanio.com',
    linkedin: 'christophertaylor',
    twitter: '@christophertaylor',
    image: null,
  },
];

export default function Team() {
  // Generate placeholder image URL based on name
  const getPlaceholderImage = (name) => {
    // Using a placeholder service that generates avatars based on name
    const initials = name.split(' ').map(n => n[0]).join('');
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=3b82f6&color=fff&bold=true`;
  };

  return (
    <GlassBackground>
      <Helmet>
        <title>Our Team - Meet the Evanio Team | Evanio</title>
        <meta name="description" content="Meet the talented individuals who make Evanio possible. Our team is dedicated to your success. Get to know our CEO & Founder and our expert team members." />
        <meta name="keywords" content="Evanio team, company team, business team, CEO, founders, developers, designers, customer success" />
        <meta property="og:title" content="Our Team - Meet the Evanio Team" />
        <meta property="og:description" content="Meet the talented individuals who make Evanio possible. Our team is dedicated to your success." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Team
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Meet the talented individuals who make Evanio possible. Our team is dedicated to your success.
            </p>
          </div>

          {/* CEO & Founder Section - Featured at Top */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full mb-4">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">Leadership</span>
              </div>
            </div>
            
            <GlassCard variant="hero" className="p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* CEO Image */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img
                      src={ceo.image}
                      alt={ceo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.target.src = getPlaceholderImage(ceo.name);
                      }}
                    />
                  </div>
                </div>
                
                {/* CEO Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-5 md:gap-6">
                    {ceo.name}
                    <span className="relative inline-flex items-center justify-center" title="Verified">
                      <span className="absolute w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[3]" />
                      </span>
                    </span>
                  </h3>
                  <p className="text-xl md:text-2xl text-blue-300 mb-4 font-semibold">{ceo.role}</p>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">{ceo.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
                    <a
                      href={`mailto:${ceo.email}`}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="Email"
                      aria-label={`Email ${ceo.name}`}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={`https://wa.me/${ceo.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="WhatsApp"
                      aria-label={`${ceo.name} WhatsApp`}
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                    <a
                      href={ceo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="Facebook"
                      aria-label={`${ceo.name} Facebook`}
                    >
                      <Facebook className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={ceo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="Instagram"
                      aria-label={`${ceo.name} Instagram`}
                    >
                      <Instagram className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={ceo.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="TikTok"
                      aria-label={`${ceo.name} TikTok`}
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                    <a
                      href={ceo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="Twitter / X"
                      aria-label={`${ceo.name} Twitter`}
                    >
                      <Twitter className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={ceo.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="YouTube"
                      aria-label={`${ceo.name} YouTube`}
                    >
                      <Youtube className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href={ceo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      title="LinkedIn"
                      aria-label={`${ceo.name} LinkedIn`}
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Team Members Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/50 rounded-full mb-4">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-semibold">Expert Team</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Team Members</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Talented professionals dedicated to delivering exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <GlassCard key={index} variant="service" className="p-6 md:p-8 hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    {/* Team Member Image */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white/30 shadow-xl">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = getPlaceholderImage(member.name);
                          }}
                        />
                      ) : (
                        <img
                          src={getPlaceholderImage(member.name)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-300 mb-4 font-medium">{member.role}</p>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed min-h-[60px]">{member.bio}</p>
                    
                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        title="Email"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        title="LinkedIn"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        title="Twitter"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <GlassCard variant="default" className="p-6 text-center">
              <Users className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">13</div>
              <div className="text-white/70 text-sm">Team Members</div>
            </GlassCard>
            <GlassCard variant="default" className="p-6 text-center">
              <Award className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-white/70 text-sm">Years Experience</div>
            </GlassCard>
            <GlassCard variant="default" className="p-6 text-center">
              <Rocket className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">5,000+</div>
              <div className="text-white/70 text-sm">Projects Completed</div>
            </GlassCard>
            <GlassCard variant="default" className="p-6 text-center">
              <Award className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">99%</div>
              <div className="text-white/70 text-sm">Client Satisfaction</div>
            </GlassCard>
          </div>

          {/* Join Us Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Team</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for excellence and innovation.
            </p>
            <a href="/careers">
              <button className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105">
                View Open Positions
              </button>
            </a>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}
