import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CreditCard, 
  Building2,
  Eye,
  Package,
  MessageSquare,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import OrderWorkflowSteps from '../../components/OrderWorkflowSteps';
import OrderTimeline from '../../components/OrderTimeline';
import OrderNotes from '../../components/OrderNotes';
import ReviewForm from '../../components/ReviewForm';

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(null);

  const handleOpenTicket = (order) => {
    // Navigate to tickets page with order ID as query parameter
    navigate(`/dashboard/tickets?orderId=${order._id}`);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Auto-refresh orders every 30 seconds if enabled
  useEffect(() => {
    if (!autoRefresh || !user) return;

    const interval = setInterval(() => {
      fetchOrders(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, user]);

  // Fetch selected order details when expanded
  useEffect(() => {
    if (selectedOrder) {
      fetchOrderDetails(selectedOrder);
    }
  }, [selectedOrder]);

  useEffect(() => {
    // Check for success message in URL
    if (searchParams.get('success') === 'bank_transfer_submitted') {
      setSuccessMessage('Bank transfer details submitted successfully! Your order is pending admin confirmation.');
      // Remove success param from URL
      setSearchParams({});
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [searchParams, setSearchParams]);

  const fetchOrders = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      }
      const response = await api.get('/orders/my-orders');
      setOrders(response.data);
      
      // Update selected order data if it's currently expanded
      if (selectedOrder) {
        const updatedOrder = response.data.find(o => o._id === selectedOrder);
        if (updatedOrder) {
          setSelectedOrderData(updatedOrder);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/single/${orderId}`);
      setSelectedOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'in-progress':
      case 'confirmed':
        return <Package className="w-5 h-5 text-blue-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/30 text-green-200 border-green-400/50';
      case 'failed':
      case 'refunded':
        return 'bg-red-500/30 text-red-200 border-red-400/50';
      default:
        return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/30 text-green-200 border-green-400/50';
      case 'cancelled':
        return 'bg-red-500/30 text-red-200 border-red-400/50';
      case 'in-progress':
        return 'bg-blue-500/30 text-blue-200 border-blue-400/50';
      case 'confirmed':
        return 'bg-purple-500/30 text-purple-200 border-purple-400/50';
      default:
        return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50';
    }
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="text-white/80 mt-2">View and manage your service orders</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-white/80">Auto-refresh</span>
              </label>
              <button
                onClick={() => fetchOrders(true)}
                disabled={refreshing}
                className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                title="Refresh orders"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {successMessage && (
            <Card glass className="mb-6 p-4 bg-green-500/20 border border-green-400/50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-200">{successMessage}</p>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="ml-auto text-green-200 hover:text-green-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </Card>
          )}

          {orders.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80 mb-4">You don't have any orders yet.</p>
                <Link to="/">
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Browse Services
                  </button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card glass key={order._id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getStatusIcon(order.orderStatus)}
                        <div>
                          <h3 className="text-xl font-bold text-white">{order.service}</h3>
                          <p className="text-sm text-white/70 font-mono">Order #{order.orderNumber}</p>
                        </div>
                      </div>
                      {order.package && (
                        <p className="text-white/80 mb-2">
                          <span className="font-semibold">Package:</span> {order.package}
                        </p>
                      )}
                      {order.addons && order.addons.length > 0 && (
                        <div className="mb-2">
                          <p className="text-white/80 text-sm">
                            <span className="font-semibold">Add-ons:</span>{' '}
                            {order.addons.map((addon, idx) => (
                              <span key={idx}>
                                {addon.name} {idx < order.addons.length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border capitalize ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentMethod === 'stripe' ? (
                            <CreditCard className="w-3 h-3 inline mr-1" />
                          ) : (
                            <Building2 className="w-3 h-3 inline mr-1" />
                          )}
                          Payment: {order.paymentStatus}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border capitalize ${getOrderStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          Order: {order.orderStatus}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white mb-2">
                        ${order.amount?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-white/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                          className="flex-1 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedOrder === order._id ? 'Hide' : 'Track My Order'}
                        </button>
                        <button
                          onClick={() => handleOpenTicket(order)}
                          className="flex-1 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Open a Ticket
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedOrder === order._id && (
                    <div className="mt-6 pt-6 border-t border-white/20 space-y-6">
                      {/* Delivery Date Estimate */}
                      {(selectedOrderData?.estimatedDeliveryDate || order.estimatedDeliveryDate) && (
                        <Card glass className="p-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className="text-sm text-white/70">Estimated Delivery</p>
                              <p className="text-lg font-semibold text-white">
                                {new Date(selectedOrderData?.estimatedDeliveryDate || order.estimatedDeliveryDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              {selectedOrderData?.actualDeliveryDate && (
                                <p className="text-sm text-green-400 mt-1">
                                  Delivered: {new Date(selectedOrderData.actualDeliveryDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      )}

                      {/* Order Workflow Steps */}
                      <OrderWorkflowSteps 
                        order={selectedOrderData || order} 
                        isAdmin={false} 
                        onUpdate={() => {
                          fetchOrders();
                          fetchOrderDetails(order._id);
                        }}
                      />

                      {/* Order Timeline */}
                      {selectedOrderData && selectedOrderData.timeline && (
                        <OrderTimeline timeline={selectedOrderData.timeline} isAdmin={false} />
                      )}

                      {/* Order Notes */}
                      <OrderNotes 
                        orderId={order._id} 
                        order={selectedOrderData || order}
                        onUpdate={() => {
                          fetchOrders();
                          fetchOrderDetails(order._id);
                        }}
                      />

                      {/* Review Form for Completed Orders */}
                      {selectedOrderData && selectedOrderData.orderStatus === 'completed' && (
                        <div>
                          {showReviewForm === selectedOrderData._id ? (
                            <ReviewForm
                              orderId={selectedOrderData._id}
                              serviceName={selectedOrderData.service}
                              onSuccess={() => {
                                setShowReviewForm(null);
                                fetchOrderDetails(selectedOrder);
                              }}
                              onCancel={() => setShowReviewForm(null)}
                            />
                          ) : (
                            <Card glass className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-white mb-1">Share Your Experience</h4>
                                  <p className="text-sm text-white/70">Help others by writing a review</p>
                                </div>
                                <Button
                                  onClick={() => setShowReviewForm(selectedOrderData._id)}
                                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                                >
                                  Write Review
                                </Button>
                              </div>
                            </Card>
                          )}
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-white mb-3">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Order Number:</span>
                              <span className="text-white font-mono">{order.orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Service:</span>
                              <span className="text-white">{order.service}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Amount:</span>
                              <span className="text-white font-semibold">${order.amount?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Payment Method:</span>
                              <span className="text-white capitalize">
                                {order.paymentMethod === 'stripe' ? 'Credit/Debit Card' : 'Bank Transfer'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Order Date:</span>
                              <span className="text-white">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {order.projectBrief && (
                          <div>
                            <h4 className="font-semibold text-white mb-3">Project Brief</h4>
                            <p className="text-white/80 text-sm whitespace-pre-wrap">
                              {order.projectBrief}
                            </p>
                          </div>
                        )}
                        {order.adminNotes && (
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-white mb-3">Admin Notes</h4>
                            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                              <p className="text-white/90 text-sm whitespace-pre-wrap">
                                {order.adminNotes}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

