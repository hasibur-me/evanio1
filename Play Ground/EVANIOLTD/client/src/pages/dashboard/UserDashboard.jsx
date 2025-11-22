import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { FileText, MessageSquare, CreditCard, Bell, Rocket, ShoppingBag, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    orders: 0,
    documents: 0,
    totalSpent: 0,
    unreadNotifications: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (showRefreshing = false) => {
    if (!user) return;
    
    try {
      if (showRefreshing) {
        setRefreshing(true);
      }
      
      const [documentsRes, ticketsRes, ordersRes] = await Promise.all([
        api.get('/documents'),
        api.get('/tickets'),
        api.get('/orders/my-orders').catch(() => ({ data: [] })),
      ]);

      const unreadNotifications = user?.notifications?.filter(n => !n.read).length || 0;

      // Calculate total spent from completed orders
      const completedOrders = ordersRes.data.filter(
        order => order.paymentStatus === 'completed'
      );
      const totalSpent = completedOrders.reduce((sum, order) => sum + (order.amount || 0), 0);

      setStats({
        orders: ordersRes.data.length,
        documents: documentsRes.data.length,
        totalSpent: totalSpent,
        unreadNotifications,
      });

      // Get recent orders (last 5) - sorted by most recent first
      const sortedOrders = [...ordersRes.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentOrders(sortedOrders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
      
      // Auto-refresh orders every 30 seconds
      const interval = setInterval(() => {
        fetchStats(true); // Show refreshing indicator
      }, 30000); // 30 seconds

      // Refresh when page becomes visible (user switches back to tab)
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          fetchStats(true);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 md:ml-64 p-4 md:p-8 pb-20 w-full">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/80 mt-2 text-sm md:text-base">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Link to="/dashboard/orders">
              <Card glass className="cursor-pointer hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/70 mb-1">Total Orders</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stats.orders}</p>
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
                  </div>
                </div>
              </Card>
            </Link>

            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 border border-white/20 hover:border-green-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Total Documents</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.documents}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
                </div>
              </div>
            </Card>

            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-white/20 hover:border-purple-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Total Spent</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {loading ? '...' : `$${stats.totalSpent.toFixed(2)}`}
                  </p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-purple-300" />
                </div>
              </div>
            </Card>

            <Link to="/dashboard/notifications">
              <Card glass className="cursor-pointer hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 border border-white/20 hover:border-orange-400/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-white/70 mb-1">Notifications</p>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stats.unreadNotifications}</p>
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-500/20 rounded-lg flex items-center justify-center relative">
                    <Bell className="w-6 h-6 md:w-8 md:h-8 text-orange-300" />
                    {stats.unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white/20 animate-pulse"></span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <Card glass className="overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 p-4 md:p-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg md:text-xl font-semibold text-white">Recent Orders</h2>
                {refreshing && (
                  <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => fetchStats(true)}
                  className="text-xs md:text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1 px-3 py-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                  title="Refresh orders"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <Link to="/dashboard/orders">
                  <button className="text-xs md:text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors">View All</button>
                </Link>
              </div>
            </div>
            <div className="p-4 md:p-6">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/80">You don't have any orders yet.</p>
                  <Link to="/services">
                    <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                      Browse Services
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-white/5 to-white/0 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{order.service}</p>
                        <p className="text-xs md:text-sm text-white/70 font-mono mt-1">#{order.orderNumber}</p>
                        <p className="text-xs text-white/60 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="text-right">
                          <p className="text-white font-semibold text-lg">${order.amount?.toFixed(2)}</p>
                          <span
                            className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                              order.orderStatus === 'completed'
                                ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                                : order.orderStatus === 'in-progress'
                                ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                                : 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <Link to={`/dashboard/orders`}>
                          <button className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </GlassBackground>
  );
}


