import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password, twoFactorToken || undefined);
      
      // Check if 2FA is required
      if (result && result.requires2FA) {
        setRequires2FA(true);
        setError('');
        return;
      }
      
      // Normal login success
      if (result && result.token) {
        if (result.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      setRequires2FA(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex items-center justify-center py-20 min-h-screen">
        <Card glass className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
          
          {error && (
            <div className="backdrop-blur-sm bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email
              </label>
              <Input
                glass
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <Input
                glass
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!requires2FA}
                disabled={requires2FA}
                placeholder="Enter your password"
              />
            </div>

            {requires2FA && (
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Two-Factor Authentication Code
                </label>
                <Input
                  glass
                  type="text"
                  value={twoFactorToken}
                  onChange={(e) => setTwoFactorToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest font-mono"
                />
                <p className="text-xs text-white/60 mt-2">
                  Enter the 6-digit code from your authenticator app or a backup code
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90"
              disabled={loading}
            >
              {loading ? (requires2FA ? 'Verifying...' : 'Logging in...') : (requires2FA ? 'Verify & Login' : 'Login')}
            </Button>
          </form>

          <p className="mt-6 text-center text-white/80">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline font-medium">
              Register here
            </Link>
          </p>
        </Card>
      </div>
      <Footer />
    </GlassBackground>
  );
}


