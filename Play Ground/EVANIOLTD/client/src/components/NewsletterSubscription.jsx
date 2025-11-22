import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import api from '../utils/api';
import { Mail, CheckCircle2, XCircle } from 'lucide-react';

export default function NewsletterSubscription({ compact = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/newsletter/subscribe', { email, name });
      setSubscribed(true);
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(error.response?.data?.message || 'Error subscribing to newsletter');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <Card glass={!compact} className={compact ? 'p-4' : ''}>
        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          <p className="text-sm">Successfully subscribed to newsletter!</p>
        </div>
      </Card>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <Input
          glass
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {loading ? '...' : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <Card glass>
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Newsletter Subscription</h3>
      </div>
      <p className="text-white/70 mb-4">
        Stay updated with our latest services, tips, and special offers.
      </p>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Name (Optional)</label>
          <Input
            glass
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Email *</label>
          <Input
            glass
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </Button>
      </form>
    </Card>
  );
}

