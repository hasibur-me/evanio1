import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
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
  Edit,
  Route
} from 'lucide-react';
import OrderWorkflowSteps from '../../components/OrderWorkflowSteps';
import { cn } from '../../utils/cn';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showOrderProgress, setShowOrderProgress] = useState({});
  const [updateData, setUpdateData] = useState({
    orderStatus: '',
    paymentStatus: '',
    adminNotes: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/admin/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId) => {
    try {
      // Ensure we send valid data - at least one field must be provided
      const updatePayload = {};
      
      if (updateData.orderStatus && updateData.orderStatus.trim()) {
        updatePayload.orderStatus = updateData.orderStatus;
      }
      
      if (updateData.paymentStatus && updateData.paymentStatus.trim()) {
        updatePayload.paymentStatus = updateData.paymentStatus;
      }
      
      // Admin notes can be empty string, so always include it if provided
      if (updateData.adminNotes !== undefined) {
        updatePayload.adminNotes = updateData.adminNotes || '';
      }

      // Check if there's anything to update
      if (Object.keys(updatePayload).length === 0) {
        alert('Please select at least one field to update (Order Status, Payment Status, or Admin Notes)');
        return;
      }

      console.log('Sending PATCH request to:', `/orders/admin/${orderId}/status`);
      console.log('Payload:', updatePayload);
      
      const response = await api.patch(`/orders/admin/${orderId}/status`, updatePayload);
      
      console.log('Update successful:', response.data);
      await fetchOrders();
      setIsEditing(false);
      setSelectedOrder(null);
      setUpdateData({ orderStatus: '', paymentStatus: '', adminNotes: '' });
    } catch (error) {
      console.error('Error updating order:', error);
      console.error('Error response:', error.response);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to update order. Please check your connection and try again.';
      alert(errorMessage);
    }
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setUpdateData({
      orderStatus: order.orderStatus || '',
      paymentStatus: order.paymentStatus || '',
      adminNotes: order.adminNotes || '',
    });
    setIsEditing(true);
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

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + o.amount, 0);

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin />
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
        <Sidebar isAdmin />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Orders Management</h1>
            <p className="text-white/80 mt-2">View and manage all customer orders</p>
          </div>

          <Card glass className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-white">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-sm text-white/70 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                </div>
                <ShoppingBag className="w-10 h-10 text-blue-300" />
              </div>
            </div>
          </Card>

          {orders.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">No orders found</p>
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-white/70">Customer:</span>
                        <span className="text-white font-medium">
                          {order.userId?.name || order.customerDetails?.name || 'Unknown'}
                        </span>
                        <span className="text-white/70">({order.userId?.email || order.customerDetails?.email || 'N/A'})</span>
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
                      <p className="text-sm text-white/70 mb-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setShowOrderProgress({
                            ...showOrderProgress,
                            [order._id]: !showOrderProgress[order._id]
                          })}
                          className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <Route className="w-4 h-4" />
                          {showOrderProgress[order._id] ? 'Hide' : 'Order Progress'}
                        </button>
                        <button
                          onClick={() => openEditModal(order)}
                          className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <Edit className="w-4 h-4" />
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Workflow Steps - Toggle with button */}
                  {showOrderProgress[order._id] && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <OrderWorkflowSteps 
                        order={order} 
                        isAdmin={true} 
                        onUpdate={fetchOrders}
                      />
                    </div>
                  )}

                  {(order.projectBrief || order.adminNotes || order.bankTransferDetails) && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        {order.projectBrief && (
                          <div>
                            <h4 className="font-semibold text-white mb-3">Project Brief</h4>
                            <p className="text-white/80 text-sm whitespace-pre-wrap">
                              {order.projectBrief}
                            </p>
                          </div>
                        )}
                        {order.bankTransferDetails && (
                          <div>
                            <h4 className="font-semibold text-white mb-3">Bank Transfer Details</h4>
                            <div className="space-y-1 text-sm">
                              {order.bankTransferDetails.transactionId && (
                                <div className="flex justify-between">
                                  <span className="text-white/70">Transaction ID:</span>
                                  <span className="text-white">{order.bankTransferDetails.transactionId}</span>
                                </div>
                              )}
                              {order.bankTransferDetails.bankName && (
                                <div className="flex justify-between">
                                  <span className="text-white/70">Bank Name:</span>
                                  <span className="text-white">{order.bankTransferDetails.bankName}</span>
                                </div>
                              )}
                            </div>
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

          {/* Edit Modal */}
          {isEditing && selectedOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="max-w-2xl w-full p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Update Order Status</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Order Status</label>
                    <select
                      value={updateData.orderStatus}
                      onChange={(e) => setUpdateData({ ...updateData, orderStatus: e.target.value })}
                      className="w-full px-4 py-2.5 backdrop-blur-sm bg-gray-900/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white"
                    >
                      <option value="pending" className="bg-gray-900 text-white">Pending</option>
                      <option value="confirmed" className="bg-gray-900 text-white">Confirmed</option>
                      <option value="in-progress" className="bg-gray-900 text-white">In Progress</option>
                      <option value="completed" className="bg-gray-900 text-white">Completed</option>
                      <option value="cancelled" className="bg-gray-900 text-white">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Payment Status</label>
                    <select
                      value={updateData.paymentStatus}
                      onChange={(e) => setUpdateData({ ...updateData, paymentStatus: e.target.value })}
                      className="w-full px-4 py-2.5 backdrop-blur-sm bg-gray-900/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white"
                    >
                      <option value="pending" className="bg-gray-900 text-white">Pending</option>
                      <option value="completed" className="bg-gray-900 text-white">Completed</option>
                      <option value="failed" className="bg-gray-900 text-white">Failed</option>
                      <option value="refunded" className="bg-gray-900 text-white">Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Admin Notes
                      <span className="text-xs text-white/60 ml-2 font-normal">(Optional - Add notes about this order for your team)</span>
                    </label>
                    <Textarea
                      glass
                      value={updateData.adminNotes}
                      onChange={(e) => setUpdateData({ ...updateData, adminNotes: e.target.value })}
                      rows={4}
                      placeholder="Example: Payment received, work in progress, customer approved, any internal notes..."
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleUpdateOrder(selectedOrder._id)}
                      className="flex-1"
                      size="lg"
                    >
                      Update Order
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedOrder(null);
                        setUpdateData({ orderStatus: '', paymentStatus: '', adminNotes: '' });
                      }}
                      variant="secondary"
                      className="flex-1"
                      size="lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}
