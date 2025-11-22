import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import api from '../utils/api';
import { Mail, Bell, ShoppingBag, CreditCard, FileText, MessageSquare, Megaphone, Settings, CheckCircle } from 'lucide-react';

export default function EmailPreferences() {
  const [preferences, setPreferences] = useState({
    receiveWelcomeEmails: true,
    receiveOrderEmails: true,
    receivePaymentEmails: true,
    receiveDocumentEmails: true,
    receiveTicketEmails: true,
    receiveMarketingEmails: false,
    receiveSystemEmails: true,
    receiveCriticalEmails: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await api.get('/email/preferences');
      if (response.data.emailPreferences) {
        setPreferences(response.data.emailPreferences);
      }
    } catch (error) {
      console.error('Error fetching email preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/email/preferences', preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving email preferences:', error);
      alert(error.response?.data?.message || 'Error saving preferences');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card glass>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white/70 mt-4">Loading preferences...</p>
        </div>
      </Card>
    );
  }

  const preferenceOptions = [
    {
      key: 'receiveWelcomeEmails',
      label: 'Welcome Emails',
      description: 'Receive welcome emails when you register',
      icon: Mail,
      color: 'text-blue-400'
    },
    {
      key: 'receiveOrderEmails',
      label: 'Order Updates',
      description: 'Receive emails about your order status and confirmations',
      icon: ShoppingBag,
      color: 'text-green-400'
    },
    {
      key: 'receivePaymentEmails',
      label: 'Payment Notifications',
      description: 'Receive emails about payment confirmations and receipts',
      icon: CreditCard,
      color: 'text-purple-400'
    },
    {
      key: 'receiveDocumentEmails',
      label: 'Document Notifications',
      description: 'Receive emails when new documents are uploaded',
      icon: FileText,
      color: 'text-yellow-400'
    },
    {
      key: 'receiveTicketEmails',
      label: 'Support Ticket Updates',
      description: 'Receive emails when support tickets are updated or replied to',
      icon: MessageSquare,
      color: 'text-pink-400'
    },
    {
      key: 'receiveSystemEmails',
      label: 'System Notifications',
      description: 'Receive important system notifications and updates',
      icon: Settings,
      color: 'text-gray-400'
    },
    {
      key: 'receiveMarketingEmails',
      label: 'Marketing Emails',
      description: 'Receive promotional emails, newsletters, and special offers',
      icon: Megaphone,
      color: 'text-orange-400'
    },
    {
      key: 'receiveCriticalEmails',
      label: 'Critical Emails',
      description: 'Always receive critical emails (payments, urgent order updates). This cannot be disabled.',
      icon: Bell,
      color: 'text-red-400',
      disabled: true
    }
  ];

  return (
    <Card glass>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-1">Email Preferences</h2>
        <p className="text-sm text-white/70">
          Manage which emails you want to receive
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {preferenceOptions.map((option) => {
          const Icon = option.icon;
          const isEnabled = preferences[option.key];
          
          return (
            <div
              key={option.key}
              className="flex items-start justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg bg-white/10 ${option.color} flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{option.label}</h3>
                    {option.disabled && (
                      <span className="text-xs px-1.5 py-0.5 bg-blue-500/30 text-blue-200 rounded flex-shrink-0">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2">{option.description}</p>
                </div>
              </div>
              <div className="ml-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => !option.disabled && handleToggle(option.key)}
                  disabled={option.disabled}
                  className={`
                    relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0
                    ${isEnabled ? 'bg-blue-600' : 'bg-gray-600'}
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  `}
                >
                  <span
                    className={`
                      inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
                      ${isEnabled ? 'translate-x-5' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
        {saved && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Preferences saved!</span>
          </div>
        )}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </Card>
  );
}

