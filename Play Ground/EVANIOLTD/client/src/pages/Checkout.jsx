import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import api from '../utils/api';
import { CreditCard, Building2, CheckCircle2, X, Loader2, ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  // Get order details from URL params
  const service = searchParams.get('service') || '';
  const serviceSlug = searchParams.get('serviceSlug') || '';
  const packageName = searchParams.get('package') || '';
  const packagePrice = searchParams.get('packagePrice') || '0';
  const addonsParam = searchParams.get('addons') || '[]';

  // Parse addons
  let addons = [];
  try {
    addons = JSON.parse(decodeURIComponent(addonsParam));
  } catch (e) {
    addons = [];
  }

  // Calculate total - handle price ranges (e.g., "$79 – $149" -> use minimum price)
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Remove currency symbols and extract numbers
    const numbers = priceStr.match(/[\d.]+/g);
    if (!numbers || numbers.length === 0) return 0;
    // If multiple numbers found (range), use the first one (minimum)
    return parseFloat(numbers[0]) || 0;
  };

  const packagePriceNum = parsePrice(packagePrice);
  const addonsTotal = addons.reduce((sum, addon) => {
    const price = typeof addon.price === 'string' ? parsePrice(addon.price) : (addon.price || 0);
    return sum + price;
  }, 0);
  const total = packagePriceNum + addonsTotal;

  const [step, setStep] = useState(user ? 'payment' : 'auth');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
  });
  const [projectBrief, setProjectBrief] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [bankTransferDetails, setBankTransferDetails] = useState({
    transactionId: '',
    bankName: '',
    accountNumber: '',
    notes: '',
    proofOfPayment: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (user) {
      setStep('payment');
      setCustomerDetails({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        company: '',
      });
    }
  }, [user]);

  // Reset processing state when component mounts or step changes
  useEffect(() => {
    if (step === 'bank-transfer') {
      setIsProcessing(false);
      setError('');
    }
  }, [step]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (authMode === 'register') {
        if (authData.password !== authData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (authData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await register(authData.name, authData.email, authData.password);
      } else {
        await login(authData.email, authData.password);
      }
      setStep('payment');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleCreateOrder = async () => {
    // Check if user is authenticated
    if (!user) {
      setError('Please login or create an account first');
      setStep('auth');
      return;
    }

    if (!service || !serviceSlug) {
      setError('Missing required order information');
      return;
    }

    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      setError('Please fill in all required customer details');
      return;
    }

    if (total <= 0) {
      setError('Invalid order amount. Please contact support.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const parsePriceForOrder = (priceStr) => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;
        const numbers = priceStr.match(/[\d.]+/g);
        return numbers && numbers.length > 0 ? parseFloat(numbers[0]) || 0 : 0;
      };

      const orderData = {
        service,
        serviceSlug,
        package: packageName,
        addons: addons.map(addon => ({
          name: addon.name || '',
          price: parsePriceForOrder(addon.price),
        })),
        amount: total,
        paymentMethod,
        customerDetails,
        projectBrief,
      };

      const response = await api.post('/orders', orderData);
      setOrderId(response.data._id);

      if (paymentMethod === 'stripe') {
        // Create Stripe checkout session
        const checkoutResponse = await api.post('/orders/create-checkout-session', {
          orderId: response.data._id,
        });
        window.location.href = checkoutResponse.data.url;
      } else {
        // Show bank transfer form
        setStep('bank-transfer');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBankTransfer = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!bankTransferDetails.transactionId || !bankTransferDetails.transactionId.trim()) {
      setError('Transaction ID / Reference Number is required');
      return;
    }

    if (!bankTransferDetails.bankName || !bankTransferDetails.bankName.trim()) {
      setError('Bank Name is required');
      return;
    }

    if (!bankTransferDetails.accountNumber || !bankTransferDetails.accountNumber.trim()) {
      setError('Account Number is required');
      return;
    }

    if (!orderId) {
      setError('Order ID is missing. Please refresh the page and try again.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Submit bank transfer details
      const response = await api.post('/orders/bank-transfer', {
        orderId,
        bankTransferDetails: {
          transactionId: bankTransferDetails.transactionId.trim(),
          bankName: bankTransferDetails.bankName.trim(),
          accountNumber: bankTransferDetails.accountNumber.trim(),
          notes: bankTransferDetails.notes?.trim() || '',
          proofOfPayment: bankTransferDetails.proofOfPayment?.name || '',
        },
      });

      // Redirect to dashboard with success message
      navigate('/dashboard/orders?success=bank_transfer_submitted');
    } catch (err) {
      console.error('Bank transfer submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit bank transfer details. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Checkout
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {step === 'auth' && (
                <GlassCard variant="default" className="p-8">
                  <div className="flex gap-4 mb-6">
                    <Button
                      variant={authMode === 'login' ? 'primary' : 'secondary'}
                      onClick={() => setAuthMode('login')}
                      className="flex-1"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button
                      variant={authMode === 'register' ? 'primary' : 'secondary'}
                      onClick={() => setAuthMode('register')}
                      className="flex-1"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Full Name
                        </label>
                        <Input
                          glass
                          type="text"
                          value={authData.name}
                          onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email
                      </label>
                      <Input
                        glass
                        type="email"
                        value={authData.email}
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Password
                      </label>
                      <Input
                        glass
                        type="password"
                        value={authData.password}
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                        minLength={6}
                      />
                    </div>
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Confirm Password
                        </label>
                        <Input
                          glass
                          type="password"
                          value={authData.confirmPassword}
                          onChange={(e) => setAuthData({ ...authData, confirmPassword: e.target.value })}
                          placeholder="Confirm your password"
                          required
                          minLength={6}
                        />
                      </div>
                    )}

                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg">
                      {authMode === 'login' ? 'Login' : 'Create Account'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </GlassCard>
              )}

              {step === 'payment' && (
                <>
                  <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Customer Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Full Name *
                        </label>
                        <Input
                          glass
                          type="text"
                          value={customerDetails.name}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Email *
                        </label>
                        <Input
                          glass
                          type="email"
                          value={customerDetails.email}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Phone *
                        </label>
                        <Input
                          glass
                          type="tel"
                          value={customerDetails.phone}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Company (Optional)
                        </label>
                        <Input
                          glass
                          type="text"
                          value={customerDetails.company}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, company: e.target.value })}
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Project Brief (Optional)
                        </label>
                        <Textarea
                          glass
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          rows={4}
                          placeholder="Tell us about your project..."
                        />
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard variant="default" className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'stripe'
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        onClick={() => setPaymentMethod('stripe')}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="font-bold text-white">Credit/Debit Card (Stripe)</h3>
                            <p className="text-sm text-white/70">Pay instantly with your card</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'bank_transfer'
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        onClick={() => setPaymentMethod('bank_transfer')}
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="w-6 h-6 text-green-400" />
                          <div>
                            <h3 className="font-bold text-white">Bank Transfer</h3>
                            <p className="text-sm text-white/70">Manual bank transfer (admin approval required)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </>
              )}

              {step === 'bank-transfer' && (
                <GlassCard variant="default" className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Bank Transfer Details</h2>
                  <form onSubmit={handleBankTransfer} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Transaction ID / Reference Number *
                      </label>
                      <Input
                        glass
                        type="text"
                        value={bankTransferDetails.transactionId}
                        onChange={(e) => setBankTransferDetails({ ...bankTransferDetails, transactionId: e.target.value })}
                        placeholder="Enter transaction ID or reference number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Bank Name *
                      </label>
                      <Input
                        glass
                        type="text"
                        value={bankTransferDetails.bankName}
                        onChange={(e) => setBankTransferDetails({ ...bankTransferDetails, bankName: e.target.value })}
                        placeholder="Enter bank name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Account Number (Last 4 digits) *
                      </label>
                      <Input
                        glass
                        type="text"
                        value={bankTransferDetails.accountNumber}
                        onChange={(e) => setBankTransferDetails({ ...bankTransferDetails, accountNumber: e.target.value })}
                        placeholder="Enter last 4 digits of account number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Additional Notes
                      </label>
                      <Textarea
                        glass
                        value={bankTransferDetails.notes}
                        onChange={(e) => setBankTransferDetails({ ...bankTransferDetails, notes: e.target.value })}
                        rows={3}
                        placeholder="Any additional information about the transfer..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Proof of Payment (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setBankTransferDetails({ ...bankTransferDetails, proofOfPayment: e.target.files[0] })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full inline-flex items-center justify-center whitespace-nowrap" 
                      size="lg" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Bank Transfer Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </GlassCard>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <GlassCard variant="default" className="p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-white/70 text-sm">Service</p>
                    <p className="text-white font-medium">{service}</p>
                  </div>
                  {packageName && (
                    <div>
                      <p className="text-white/70 text-sm">Package</p>
                      <p className="text-white font-medium">{packageName}</p>
                      <p className="text-white/70 text-sm">${packagePriceNum.toFixed(2)}</p>
                    </div>
                  )}
                  {addons.length > 0 && (
                    <div>
                      <p className="text-white/70 text-sm mb-2">Add-ons</p>
                      {addons.map((addon, idx) => (
                        <div key={idx} className="text-white text-sm ml-2">
                          • {addon.name} - ${(typeof addon.price === 'string' ? parsePrice(addon.price) : (addon.price || 0)).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {step === 'payment' && (
                  <Button
                    onClick={handleCreateOrder}
                    className="w-full inline-flex items-center justify-center whitespace-nowrap"
                    size="lg"
                    disabled={isProcessing || !user || !customerDetails.name || !customerDetails.email || !customerDetails.phone || total <= 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Continue with Bank Transfer'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

