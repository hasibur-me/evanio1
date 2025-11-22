import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { GlassBackground } from '../../components/GlassBackground';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useTheme } from '../../context/ThemeContext';
import api from '../../utils/api';
import { Settings, Palette, Type, Image as ImageIcon, DollarSign, Save, RefreshCw } from 'lucide-react';

export default function AdminSettings() {
  const { theme, updateTheme, refreshTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    logoImage: '/logo.png',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#EC4899',
    backgroundColor: 'from-blue-100 via-purple-100 to-pink-100',
    headerBackground: 'bg-white/10',
    headerBorder: 'border-white/20',
    headingColor: 'text-white',
    bodyTextColor: 'text-white/80',
    currency: 'USD',
    currencySymbol: '$',
    siteTitle: '',
    siteDescription: '',
    heroImage: '',
    aboutImage: '',
  });

  useEffect(() => {
    if (theme) {
      setFormData({
        logoImage: theme.logoImage || '/logo.png',
        primaryColor: theme.primaryColor || '#3B82F6',
        secondaryColor: theme.secondaryColor || '#8B5CF6',
        accentColor: theme.accentColor || '#EC4899',
        backgroundColor: theme.backgroundColor || 'from-blue-100 via-purple-100 to-pink-100',
        headerBackground: theme.headerBackground || 'bg-white/10',
        headerBorder: theme.headerBorder || 'border-white/20',
        headingColor: theme.headingColor || 'text-white',
        bodyTextColor: theme.bodyTextColor || 'text-white/80',
        currency: theme.currency || 'USD',
        currencySymbol: theme.currencySymbol || '$',
        siteTitle: theme.siteTitle || '',
        siteDescription: theme.siteDescription || '',
        heroImage: theme.heroImage || '',
        aboutImage: theme.aboutImage || '',
      });
    }
  }, [theme]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage('');
    
    try {
      await updateTheme(formData);
      setSuccessMessage('Theme settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh theme to apply changes
      await refreshTheme();
    } catch (error) {
      console.error('Error saving theme settings:', error);
      alert('Failed to save theme settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all theme settings to default?')) {
      setFormData({
        logoImage: '/logo.png',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        accentColor: '#EC4899',
        backgroundColor: 'from-blue-100 via-purple-100 to-pink-100',
        headerBackground: 'bg-white/10',
        headerBorder: 'border-white/20',
        headingColor: 'text-white',
        bodyTextColor: 'text-white/80',
        currency: 'USD',
        currencySymbol: '$',
        siteTitle: '',
        siteDescription: '',
        heroImage: '',
        aboutImage: '',
      });
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin={true} />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-300" />
              Theme Settings
            </h1>
            <p className="text-white/80 mt-2">Customize the appearance, colors, and branding of your website</p>
          </div>

          {successMessage && (
            <GlassCard variant="default" className="p-4 mb-6 bg-green-500/20 border-green-400/50">
              <p className="text-green-200 font-medium">{successMessage}</p>
            </GlassCard>
          )}

          <div className="space-y-6">
            {/* Logo Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="w-6 h-6 text-blue-300" />
                <h2 className="text-2xl font-bold text-white">Logo Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Logo Image URL or Path
                  </label>
                  <Input
                    glass
                    type="text"
                    name="logoImage"
                    value={formData.logoImage}
                    onChange={handleInputChange}
                    placeholder="/logo.png or https://example.com/logo.png"
                  />
                  <p className="text-xs text-white/60 mt-2">
                    Place your logo image in the <code className="bg-white/10 px-1 rounded">client/public/</code> folder and use <code className="bg-white/10 px-1 rounded">/logo.png</code> or provide a full URL
                  </p>
                </div>

                {formData.logoImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Logo Preview
                    </label>
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 flex items-center justify-center">
                      <img 
                        src={formData.logoImage} 
                        alt="Logo Preview" 
                        className="max-h-20 w-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (!e.target.nextSibling) {
                            const errorMsg = document.createElement('p');
                            errorMsg.textContent = 'Logo image not found. Please check the path.';
                            errorMsg.className = 'text-red-400 text-sm';
                            e.target.parentElement.appendChild(errorMsg);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Color Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-purple-300" />
                <h2 className="text-2xl font-bold text-white">Color Settings</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="w-16 h-12 rounded-lg border border-white/30 cursor-pointer"
                    />
                    <Input
                      glass
                      type="text"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      className="w-16 h-12 rounded-lg border border-white/30 cursor-pointer"
                    />
                    <Input
                      glass
                      type="text"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      placeholder="#8B5CF6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      className="w-16 h-12 rounded-lg border border-white/30 cursor-pointer"
                    />
                    <Input
                      glass
                      type="text"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      placeholder="#EC4899"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Heading Color
                  </label>
                  <select
                    name="headingColor"
                    value={formData.headingColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="text-white" className="bg-gray-800">White</option>
                    <option value="text-gray-900" className="bg-gray-800">Dark</option>
                    <option value="text-blue-300" className="bg-gray-800">Blue</option>
                    <option value="text-purple-300" className="bg-gray-800">Purple</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Body Text Color
                  </label>
                  <select
                    name="bodyTextColor"
                    value={formData.bodyTextColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="text-white/80" className="bg-gray-800">White 80%</option>
                    <option value="text-white/90" className="bg-gray-800">White 90%</option>
                    <option value="text-gray-700" className="bg-gray-800">Gray</option>
                    <option value="text-gray-800" className="bg-gray-800">Dark Gray</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Header Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-green-300" />
                <h2 className="text-2xl font-bold text-white">Header Settings</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Header Background Opacity
                  </label>
                  <select
                    name="headerBackground"
                    value={formData.headerBackground}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="bg-white/5" className="bg-gray-800">5% Opacity</option>
                    <option value="bg-white/10" className="bg-gray-800">10% Opacity</option>
                    <option value="bg-white/20" className="bg-gray-800">20% Opacity</option>
                    <option value="bg-white/30" className="bg-gray-800">30% Opacity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Header Border Opacity
                  </label>
                  <select
                    name="headerBorder"
                    value={formData.headerBorder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="border-white/10" className="bg-gray-800">10% Opacity</option>
                    <option value="border-white/20" className="bg-gray-800">20% Opacity</option>
                    <option value="border-white/30" className="bg-gray-800">30% Opacity</option>
                    <option value="border-white/40" className="bg-gray-800">40% Opacity</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Image Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="w-6 h-6 text-pink-300" />
                <h2 className="text-2xl font-bold text-white">Image Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Hero Section Image URL
                  </label>
                  <Input
                    glass
                    type="url"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    About Section Image URL
                  </label>
                  <Input
                    glass
                    type="url"
                    name="aboutImage"
                    value={formData.aboutImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Pricing & Currency Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-yellow-300" />
                <h2 className="text-2xl font-bold text-white">Pricing & Currency</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Currency Code
                  </label>
                  <Input
                    glass
                    type="text"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    placeholder="USD"
                    maxLength={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Currency Symbol
                  </label>
                  <Input
                    glass
                    type="text"
                    name="currencySymbol"
                    value={formData.currencySymbol}
                    onChange={handleInputChange}
                    placeholder="$"
                    maxLength={5}
                  />
                </div>
              </div>
            </GlassCard>

            {/* Meta Settings */}
            <GlassCard variant="default" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-6 h-6 text-cyan-300" />
                <h2 className="text-2xl font-bold text-white">Site Meta Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Site Title
                  </label>
                  <Input
                    glass
                    type="text"
                    name="siteTitle"
                    value={formData.siteTitle}
                    onChange={handleInputChange}
                    placeholder="Evanio - Launch & Grow Your Business"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Site Description
                  </label>
                  <textarea
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/60"
                    placeholder="Business formation, website development, branding..."
                  />
                </div>
              </div>
            </GlassCard>

            {/* Action Buttons */}
            <GlassCard variant="default" className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Theme Settings
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset to Default
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}

