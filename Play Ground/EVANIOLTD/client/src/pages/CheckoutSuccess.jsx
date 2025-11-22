import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/Button';
import api from '../utils/api';
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const method = searchParams.get('method');
  const canceled = searchParams.get('canceled');

  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (canceled === 'true') {
      setStatus('canceled');
      return;
    }

    if (method === 'bank_transfer' && orderId) {
      // Bank transfer - just show success message
      fetchOrder();
    } else if (sessionId) {
      // Stripe payment - verify payment (orderId will be fetched from session)
      verifyPayment();
    } else if (orderId) {
      // Just orderId provided
      fetchOrder();
    } else {
      setStatus('error');
    }
  }, [sessionId, orderId, method, canceled]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/single/${orderId}`);
      setOrder(response.data);
      setStatus('success');
    } catch (error) {
      console.error('Error fetching order:', error);
      setStatus('error');
    }
  };

  const verifyPayment = async () => {
    try {
      // If we have orderId, fetch it directly
      if (orderId) {
        setTimeout(async () => {
          try {
            const response = await api.get(`/orders/single/${orderId}`);
            setOrder(response.data);
            if (response.data.paymentStatus === 'completed') {
              setStatus('success');
            } else {
              setStatus('pending');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setStatus('error');
          }
        }, 2000);
      } else if (sessionId) {
        // If we only have sessionId, try to get order from user's orders
        setTimeout(async () => {
          try {
            const response = await api.get('/orders/my-orders');
            // Find the most recent order (should be the one just created)
            const orders = response.data;
            if (orders && orders.length > 0) {
              const recentOrder = orders[0];
              setOrder(recentOrder);
              if (recentOrder.paymentStatus === 'completed') {
                setStatus('success');
              } else {
                setStatus('pending');
              }
            } else {
              setStatus('pending');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setStatus('error');
          }
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setStatus('error');
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <GlassCard variant="default" className="p-8 md:p-12 text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-spin" />
                <h1 className="text-3xl font-bold text-white mb-4">Processing Payment...</h1>
                <p className="text-white/80">Please wait while we verify your payment.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
                <p className="text-white/80 mb-6">
                  {method === 'bank_transfer'
                    ? 'Your bank transfer details have been submitted. Your order will be confirmed once payment is verified by our team.'
                    : 'Your payment has been processed successfully.'}
                </p>
                {order && (
                  <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6 text-left">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">Order Number:</span>
                        <span className="text-white font-mono font-bold">{order.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Service:</span>
                        <span className="text-white">{order.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Amount:</span>
                        <span className="text-white font-bold">${order.amount?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Payment Method:</span>
                        <span className="text-white capitalize">
                          {order.paymentMethod === 'stripe' ? 'Credit/Debit Card' : 'Bank Transfer'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Payment Status:</span>
                        <span
                          className={`font-semibold ${
                            order.paymentStatus === 'completed'
                              ? 'text-green-400'
                              : order.paymentStatus === 'pending'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {order.paymentStatus === 'completed'
                            ? 'Completed'
                            : order.paymentStatus === 'pending'
                            ? 'Pending'
                            : 'Failed'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard/orders">
                    <Button size="lg" className="inline-flex items-center">
                      <ShoppingBag className="mr-2 w-4 h-4" />
                      View Orders
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="secondary" className="inline-flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {status === 'canceled' && (
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Payment Canceled</h1>
                <p className="text-white/80 mb-6">
                  Your payment was canceled. You can complete your order at any time from your dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard/orders">
                    <Button size="lg" className="inline-flex items-center">
                      View Orders
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center"
                  >
                    Go Back
                  </Button>
                </div>
              </>
            )}

            {status === 'pending' && (
              <>
                <Loader2 className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-spin" />
                <h1 className="text-3xl font-bold text-white mb-4">Payment Pending</h1>
                <p className="text-white/80 mb-6">
                  Your payment is being processed. You will receive a confirmation email once it's completed.
                </p>
                {order && (
                  <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-6 text-left">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">Order Number:</span>
                        <span className="text-white font-mono font-bold">{order.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Amount:</span>
                        <span className="text-white font-bold">${order.amount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                <Link to="/dashboard/orders">
                  <Button size="lg" className="inline-flex items-center">
                    View Orders
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Error Processing Payment</h1>
                <p className="text-white/80 mb-6">
                  There was an error processing your payment. Please contact support if you believe this is an error.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard/orders">
                    <Button size="lg" className="inline-flex items-center">
                      View Orders
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="secondary" className="inline-flex items-center">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

