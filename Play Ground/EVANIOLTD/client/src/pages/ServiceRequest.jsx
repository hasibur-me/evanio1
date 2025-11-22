import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { allServices, getServiceById } from '../data/services';
import api from '../utils/api';
import { Upload, Send, CheckCircle2, X } from 'lucide-react';

export default function ServiceRequest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const serviceId = searchParams.get('service');
  const selectedService = serviceId ? getServiceById(serviceId) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: serviceId || '',
    projectBrief: '',
    budget: '',
    files: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('projectBrief', formData.projectBrief);
      formDataToSend.append('budget', formData.budget);

      // Append files if any
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          formDataToSend.append('files', formData.files[i]);
        }
      }

      // Send request to backend (don't set Content-Type header - axios will handle FormData)
      const response = await api.post('/services/request', formDataToSend);

      setSubmitSuccess(true);
      
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        navigate('/services');
      }, 3000);
    } catch (error) {
      console.error('Error submitting service request:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit service request. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Request a Service
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours to discuss your project.
            </p>
            {selectedService && (
              <div className="mt-6 inline-block backdrop-blur-sm bg-blue-600/20 border border-blue-400/30 rounded-full px-6 py-3">
                <p className="text-white font-medium">
                  Selected Service: <span className="text-blue-300">{selectedService.title}</span>
                </p>
              </div>
            )}
          </div>

          <GlassCard variant="cta" className="p-8 md:p-10">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/50">
                  <CheckCircle2 className="w-10 h-10 text-green-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Request Submitted!</h2>
                <p className="text-lg text-white/80 mb-6">
                  Thank you for your service request. We'll review your submission and contact you within 24 hours.
                </p>
                <p className="text-sm text-white/60">
                  Redirecting to services page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-400/50">
                    <div className="flex items-center justify-between">
                      <p className="text-red-200 font-medium">{error}</p>
                      <button
                        type="button"
                        onClick={() => setError('')}
                        className="text-red-200 hover:text-red-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Full Name *
                    </label>
                    <Input
                      glass
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email Address *
                    </label>
                    <Input
                      glass
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">
                      Company Name
                    </label>
                    <Input
                      glass
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      glass
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white/90 mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/60"
                  >
                    <option value="" className="bg-gray-800">Select a service</option>
                    {allServices.map((service) => (
                      <option key={service.id} value={service.id} className="bg-gray-800">
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Brief */}
                <div>
                  <label htmlFor="projectBrief" className="block text-sm font-medium text-white/90 mb-2">
                    Project Brief *
                  </label>
                  <Textarea
                    glass
                    id="projectBrief"
                    name="projectBrief"
                    value={formData.projectBrief}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white/90 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/60"
                  >
                    <option value="" className="bg-gray-800">Select budget range</option>
                    <option value="under-500" className="bg-gray-800">Under $500</option>
                    <option value="500-1000" className="bg-gray-800">$500 - $1,000</option>
                    <option value="1000-2500" className="bg-gray-800">$1,000 - $2,500</option>
                    <option value="2500-5000" className="bg-gray-800">$2,500 - $5,000</option>
                    <option value="5000-10000" className="bg-gray-800">$5,000 - $10,000</option>
                    <option value="over-10000" className="bg-gray-800">Over $10,000</option>
                    <option value="custom" className="bg-gray-800">Custom Quote</option>
                  </select>
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="files" className="block text-sm font-medium text-white/90 mb-2">
                    Attach Files (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="files"
                      name="files"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                    />
                    <label
                      htmlFor="files"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg cursor-pointer hover:bg-white/25 transition-colors text-white"
                    >
                      <Upload className="w-5 h-5" />
                      <span>
                        {formData.files && formData.files.length > 0
                          ? `${formData.files.length} file(s) selected`
                          : 'Click to upload files'}
                      </span>
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    Upload project briefs, reference materials, or any relevant documents (PDF, DOC, images)
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-4 text-lg font-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  <Link to="/services" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-medium"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

