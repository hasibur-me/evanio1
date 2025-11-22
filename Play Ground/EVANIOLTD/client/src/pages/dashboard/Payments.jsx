import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { CreditCard, CheckCircle, XCircle, Clock, Copy } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/payments/create-checkout-session', {
        amount: parseFloat(amount),
        description,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Error creating payment session');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-300" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-300" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-300" />;
    }
  };

  const copySessionId = (sessionId) => {
    navigator.clipboard.writeText(sessionId);
    alert('Session ID copied to clipboard!');
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            </div>
          </div>
        </div>
      </GlassBackground>
    );
  }

  return (
    <GlassBackground>
      <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Payments</h1>
            <p className="text-white/80 mt-2">View your payment history</p>
          </div>

          <Card glass className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Make a Payment</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Amount ($)
                </label>
                <Input
                  glass
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Description
                </label>
                <Input
                  glass
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Payment description"
                />
              </div>
              <Button 
                type="submit"
                className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Stripe
              </Button>
            </form>
          </Card>

          {payments.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">No payment history</p>
              </div>
            </Card>
          ) : (
            <Card glass>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold text-white">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Stripe Session ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr
                        key={payment._id}
                        className={cn(
                          'border-b border-white/10 hover:bg-white/5 transition-colors',
                          index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                        )}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            <span className="font-semibold text-white">
                              ${payment.amount?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white/90">
                          {new Date(payment.date || payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border',
                              payment.status === 'completed'
                                ? 'bg-green-500/30 text-green-200 border-green-400/50'
                                : payment.status === 'failed'
                                ? 'bg-red-500/30 text-red-200 border-red-400/50'
                                : 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50'
                            )}
                          >
                            {payment.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {payment.stripeSessionId ? (
                            <div className="flex items-center space-x-2">
                              <code className="text-xs text-white/70 font-mono bg-white/10 px-2 py-1 rounded">
                                {payment.stripeSessionId.substring(0, 20)}...
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copySessionId(payment.stripeSessionId)}
                                className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 p-1"
                                title="Copy Session ID"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-white/50 text-sm">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}
