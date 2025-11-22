import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import api from '../utils/api';
import { Shield, CheckCircle2, XCircle, Copy, Download } from 'lucide-react';

export default function TwoFactorSetup() {
  const [status, setStatus] = useState(null);
  const [setupData, setSetupData] = useState(null);
  const [verificationToken, setVerificationToken] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('status'); // status, setup, verify, complete

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await api.get('/2fa/status');
      setStatus(response.data);
      if (response.data.enabled) {
        setStep('complete');
      }
    } catch (error) {
      console.error('Error fetching 2FA status:', error);
    }
  };

  const handleEnable2FA = async () => {
    try {
      setLoading(true);
      const response = await api.post('/2fa/enable');
      setSetupData(response.data);
      setStep('verify');
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      alert(error.response?.data?.message || 'Error enabling 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationToken || verificationToken.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/2fa/verify', { token: verificationToken });
      setBackupCodes(response.data.backupCodes || []);
      setStep('complete');
      await fetchStatus();
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      alert(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    const password = prompt('Enter your password to disable 2FA:');
    const token = prompt('Enter your 2FA code or backup code:');
    
    if (!password || !token) return;

    try {
      setLoading(true);
      await api.post('/2fa/disable', { password, token });
      setStep('status');
      setSetupData(null);
      setBackupCodes([]);
      await fetchStatus();
      alert('2FA disabled successfully');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      alert(error.response?.data?.message || 'Error disabling 2FA');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (step === 'status' && !status?.enabled) {
    return (
      <Card glass>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Two-Factor Authentication</h3>
            <p className="text-white/70 text-sm">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button
            onClick={handleEnable2FA}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            {loading ? 'Setting up...' : 'Enable 2FA'}
          </Button>
        </div>
      </Card>
    );
  }

  if (step === 'verify' && setupData) {
    return (
      <Card glass>
        <h3 className="text-xl font-semibold text-white mb-4">Verify 2FA Setup</h3>
        <div className="space-y-4">
          <div>
            <p className="text-white/80 mb-3">Scan this QR code with your authenticator app:</p>
            <div className="flex justify-center mb-4">
              <img src={setupData.qrCode} alt="QR Code" className="bg-white p-4 rounded-lg" />
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/70 mb-1">Or enter this code manually:</p>
              <div className="flex items-center gap-2">
                <code className="text-white font-mono text-sm flex-1">{setupData.manualEntryKey}</code>
                <button
                  onClick={() => copyToClipboard(setupData.manualEntryKey)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Copy className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Enter 6-digit code from your app:
              </label>
              <Input
                glass
                type="text"
                value={verificationToken}
                onChange={(e) => setVerificationToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="text-center text-2xl tracking-widest"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || verificationToken.length !== 6}
              className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {loading ? 'Verifying...' : 'Verify & Enable'}
            </Button>
          </form>
        </div>
      </Card>
    );
  }

  if (step === 'complete') {
    return (
      <Card glass>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">2FA Enabled</h3>
        </div>
        <p className="text-white/70 mb-4">
          Two-factor authentication is now enabled on your account.
        </p>
        {backupCodes.length > 0 && (
          <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4 mb-4">
            <p className="text-yellow-200 font-semibold mb-2">⚠️ Save Your Backup Codes</p>
            <p className="text-yellow-200/80 text-sm mb-3">
              These codes can be used to access your account if you lose your device. Save them in a safe place!
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {backupCodes.map((code, idx) => (
                <code key={idx} className="bg-black/30 p-2 rounded text-yellow-200 font-mono text-sm">
                  {code}
                </code>
              ))}
            </div>
            <Button
              onClick={() => {
                const text = backupCodes.join('\n');
                navigator.clipboard.writeText(text);
                alert('Backup codes copied to clipboard!');
              }}
              className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
            >
              Copy All Codes
            </Button>
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>Backup codes remaining: {status?.backupCodesRemaining || 0}</span>
          <Button
            onClick={handleDisable2FA}
            disabled={loading}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm"
          >
            Disable 2FA
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}


