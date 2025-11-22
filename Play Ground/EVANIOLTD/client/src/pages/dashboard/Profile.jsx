import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { User, Camera, Upload, Facebook, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import EmailPreferences from '../../components/EmailPreferences';
import TwoFactorSetup from '../../components/TwoFactorSetup';

export default function Profile() {
  const { user, fetchUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = (user.name || '').split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setUsername(user.username || user.email?.split('@')[0] || '');
      setPhoneNumber(user.phoneNumber || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setState(user.state || '');
      setZipCode(user.zipCode || '');
      setCountry(user.country || '');
      setFacebookLink(user.facebookLink || '');
      setWhatsapp(user.whatsapp || '');
      setInstagram(user.instagram || '');
      setLinkedin(user.linkedin || '');
      setProfilePicturePreview(user.profilePicture || '');
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', `${firstName} ${lastName}`.trim());
      formData.append('email', email);
      formData.append('username', username);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipCode', zipCode);
      formData.append('country', country);
      formData.append('facebookLink', facebookLink);
      formData.append('whatsapp', whatsapp);
      formData.append('instagram', instagram);
      formData.append('linkedin', linkedin);
      
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      await api.put('/users/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      await fetchUser();
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };


  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-white/80 mt-2">Manage your account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Form */}
            <div className="lg:col-span-2">
              <Card glass className="overflow-hidden">
            {/* Profile Header Section */}
            <div className="bg-gray-100/10 border-b border-white/20 py-8 px-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center overflow-hidden">
                    {profilePicturePreview ? (
                      <img 
                        src={profilePicturePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white/50" />
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {firstName || lastName ? `${firstName} ${lastName}`.trim() : user?.name || 'User'}
                </h2>
                <p className="text-white/70">{email || user?.email || ''}</p>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        First Name:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        E-Mail Address:
                      </label>
                      <Input
                        glass
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Phone Number:
                      </label>
                      <Input
                        glass
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        State:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        City:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Change Profile Picture:
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="profile-picture-upload"
                          />
                          <span className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white/90 hover:bg-white/20 transition-colors text-sm whitespace-nowrap">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </label>
                        <span className="text-sm text-white/60">
                          {profilePicture ? profilePicture.name : 'No file chosen'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Last Name:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Username:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Address:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Zip Code:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter zip code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Country:
                      </label>
                      <Input
                        glass
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/20">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      <div className="flex items-center gap-2">
                        <Facebook className="w-4 h-4 text-blue-400" />
                        Facebook Link:
                      </div>
                    </label>
                    <Input
                      glass
                      type="url"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-green-400" />
                        WhatsApp:
                      </div>
                    </label>
                    <Input
                      glass
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+1234567890 or WhatsApp link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-400" />
                        Instagram:
                      </div>
                    </label>
                    <Input
                      glass
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-500" />
                        LinkedIn:
                      </div>
                    </label>
                    <Input
                      glass
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                {/* Update Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
            </div>

            {/* Right Column - Email Preferences & 2FA */}
            <div className="lg:col-span-1 space-y-6">
              <EmailPreferences />
              <TwoFactorSetup />
            </div>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}


