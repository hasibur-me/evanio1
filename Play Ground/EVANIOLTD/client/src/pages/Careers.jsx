import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced full-stack developer to join our engineering team.',
    requirements: ['5+ years experience', 'React, Node.js', 'MongoDB', 'RESTful APIs'],
  },
  {
    id: 2,
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our sales team and help businesses discover how Evanio can transform their operations.',
    requirements: ['3+ years B2B sales', 'Strong communication', 'CRM experience'],
  },
  {
    id: 3,
    title: 'Customer Success Specialist',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help our customers succeed by providing exceptional support and guidance.',
    requirements: ['2+ years customer service', 'Problem-solving skills', 'Technical aptitude'],
  },
  {
    id: 4,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead our marketing efforts and help build the Evanio brand.',
    requirements: ['5+ years marketing', 'Digital marketing expertise', 'Content creation'],
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create beautiful and intuitive user experiences for our platform.',
    requirements: ['3+ years design experience', 'Figma, Sketch', 'Portfolio required'],
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Ensure our infrastructure is scalable, reliable, and secure.',
    requirements: ['AWS, Docker, Kubernetes', 'CI/CD pipelines', 'Monitoring tools'],
  },
];

export default function Careers() {
  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Careers at Evanio
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Join a team of passionate professionals dedicated to helping businesses succeed. Explore exciting opportunities and build your career with us.
            </p>
          </div>

          {/* Benefits Section */}
          <GlassCard variant="cta" className="p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Work at Evanio?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Competitive Benefits</h3>
                <p className="text-white/80">Health insurance, 401(k), and generous PTO</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Remote Flexibility</h3>
                <p className="text-white/80">Work from anywhere with flexible hours</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Growth Opportunities</h3>
                <p className="text-white/80">Career development and learning programs</p>
              </div>
            </div>
          </GlassCard>

          {/* Job Openings */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Open Positions</h2>
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <GlassCard key={job.id} variant="service" className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{job.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-white/90 mb-2">Key Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 text-white/80 text-sm">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-6 py-3 font-medium transition-colors"
                      >
                        Apply Now
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Don't See a Match?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              We're always interested in hearing from talented individuals. Send us your resume and let us know how you'd like to contribute.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium transition-colors"
            >
              Get in Touch
            </Link>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}




