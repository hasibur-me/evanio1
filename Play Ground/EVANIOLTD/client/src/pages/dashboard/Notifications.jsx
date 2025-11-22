import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  CheckCheck, 
  Search, 
  Filter,
  RefreshCw,
  FileText,
  MessageSquare,
  CreditCard,
  ShoppingBag,
  Settings,
  AlertCircle,
  Clock,
  Info,
  Archive
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const { user, fetchUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, unread, read
  const [typeFilter, setTypeFilter] = useState('all'); // all, order, document, ticket, payment, system

  useEffect(() => {
    console.log('Notifications component mounted, fetching notifications...');
    fetchNotifications();
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 30000);

    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchNotifications(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterNotifications = () => {
    let filtered = [...(notifications || [])];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.message?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'unread') {
        filtered = filtered.filter(n => !n.read);
      } else if (statusFilter === 'read') {
        filtered = filtered.filter(n => n.read);
      }
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === typeFilter);
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.timestamp || 0);
      const dateB = new Date(b.createdAt || b.timestamp || 0);
      return dateB - dateA;
    });

    setFilteredNotifications(filtered);
  };

  useEffect(() => {
    filterNotifications();
  }, [notifications, searchQuery, statusFilter, typeFilter]);

  const fetchNotifications = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      }
      
      const response = await api.get('/users/notifications');
      console.log('Notifications response:', response);
      
      // Handle both direct array and object with data property
      const notificationsData = Array.isArray(response.data) 
        ? response.data 
        : (Array.isArray(response.data?.data) ? response.data.data : []);
      
      console.log('Processed notifications:', notificationsData);
      setNotifications(notificationsData);
      
      // Update user context
      if (fetchUser) {
        await fetchUser();
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMarkRead = async (notificationId) => {
    try {
      await api.put('/users/notifications/read', { notificationId });
      await fetchNotifications();
      await fetchUser();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      alert('Error marking notification as read');
    }
  };

  const handleMarkAllRead = async () => {
    if (!window.confirm('Mark all notifications as read?')) return;
    
    try {
      setProcessing(true);
      const response = await api.put('/users/notifications/read-all');
      await fetchNotifications();
      if (fetchUser) {
        await fetchUser();
      }
      const message = response.data?.message || 'All notifications marked as read';
      const count = response.data?.markedCount;
      if (count !== undefined) {
        alert(`${message} (${count} notification${count !== 1 ? 's' : ''} marked)`);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      const errorMsg = error.response?.data?.message || error.message || 'Error marking all notifications as read';
      alert(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (notificationId) => {
    if (!window.confirm('Delete this notification?')) return;
    
    try {
      await api.post('/users/notifications/delete', { notificationId });
      await fetchNotifications();
      await fetchUser();
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Error deleting notification');
    }
  };

  const handleDeleteAllRead = async () => {
    if (!window.confirm('Delete all read notifications? This action cannot be undone.')) return;
    
    try {
      setProcessing(true);
      const response = await api.delete('/users/notifications/read-all');
      await fetchNotifications();
      if (fetchUser) {
        await fetchUser();
      }
      const message = response.data?.message || 'All read notifications deleted successfully';
      const count = response.data?.deletedCount;
      if (count !== undefined) {
        alert(`${message} (${count} notification${count !== 1 ? 's' : ''} deleted)`);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Error deleting all read notifications:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method
      });
      const errorMsg = error.response?.data?.message || error.message || 'Error deleting all read notifications';
      alert(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  const getNotificationIcon = (type) => {
    const iconConfig = {
      order: { icon: ShoppingBag, color: 'text-blue-400' },
      document: { icon: FileText, color: 'text-green-400' },
      ticket: { icon: MessageSquare, color: 'text-purple-400' },
      payment: { icon: CreditCard, color: 'text-yellow-400' },
      system: { icon: Settings, color: 'text-gray-400' },
    };
    const notificationType = type || 'system';
    const config = iconConfig[notificationType] || iconConfig.system;
    const Icon = config.icon;
    return <Icon className={cn('w-5 h-5', config.color)} />;
  };

  const getNotificationTypeBadge = (type) => {
    const typeConfig = {
      order: { label: 'Order', class: 'bg-blue-500/30 text-blue-200 border-blue-400/50' },
      document: { label: 'Document', class: 'bg-green-500/30 text-green-200 border-green-400/50' },
      ticket: { label: 'Ticket', class: 'bg-purple-500/30 text-purple-200 border-purple-400/50' },
      payment: { label: 'Payment', class: 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50' },
      system: { label: 'System', class: 'bg-gray-500/30 text-gray-200 border-gray-400/50' },
    };
    const notificationType = type || 'system';
    const config = typeConfig[notificationType] || typeConfig.system;
    return (
      <span className={cn('text-xs px-2 py-1 rounded-full backdrop-blur-sm border', config.class)}>
        {config.label}
      </span>
    );
  };

  const unreadCount = (notifications || []).filter(n => !n.read).length;
  const readCount = (notifications || []).filter(n => n.read).length;

  console.log('Notifications render:', {
    loading,
    notificationsCount: notifications.length,
    filteredCount: filteredNotifications.length,
    unreadCount,
    readCount
  });

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="text-white/70 mt-4">Loading notifications...</p>
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
              <h1 className="text-3xl font-bold text-white">Premium Notifications</h1>
              <p className="text-white/80 mt-2">Stay updated with all your important notifications</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => fetchNotifications(true)}
                disabled={refreshing}
                className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
              >
                <RefreshCw className={cn('w-4 h-4 mr-2', refreshing && 'animate-spin')} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Notifications</p>
                  <p className="text-3xl font-bold text-white">{notifications.length}</p>
                </div>
                <Bell className="w-10 h-10 text-blue-400/70" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Unread</p>
                  <p className="text-3xl font-bold text-orange-400">{unreadCount}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-400/70" />
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Read</p>
                  <p className="text-3xl font-bold text-green-400">{readCount}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-400/70" />
              </div>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card glass className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    glass
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notifications..."
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
              >
                <option value="all" className="bg-gray-800">All Status</option>
                <option value="unread" className="bg-gray-800">Unread</option>
                <option value="read" className="bg-gray-800">Read</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
              >
                <option value="all" className="bg-gray-800">All Types</option>
                <option value="order" className="bg-gray-800">Orders</option>
                <option value="document" className="bg-gray-800">Documents</option>
                <option value="ticket" className="bg-gray-800">Tickets</option>
                <option value="payment" className="bg-gray-800">Payments</option>
                <option value="system" className="bg-gray-800">System</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleMarkAllRead}
                disabled={processing || unreadCount === 0}
                className="backdrop-blur-sm bg-green-600/80 border border-green-500/50 text-white hover:bg-green-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button
                onClick={handleDeleteAllRead}
                disabled={processing || readCount === 0}
                className="backdrop-blur-sm bg-red-600/80 border border-red-500/50 text-white hover:bg-red-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
              >
                <Archive className="w-4 h-4 mr-2" />
                Delete All Read
              </Button>
            </div>
          </Card>

          {/* Notifications List */}
          <Card glass>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">
                  {notifications.length === 0 
                    ? 'No notifications yet. You\'re all caught up!' 
                    : 'No notifications match your filters.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={cn(
                      'p-4 rounded-lg backdrop-blur-sm border transition-all',
                      notification.read
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30 shadow-lg'
                    )}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        'p-2 rounded-lg backdrop-blur-sm',
                        notification.read ? 'bg-white/10' : 'bg-white/20'
                      )}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2 flex-wrap">
                            {getNotificationTypeBadge(notification.type)}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-white/60">
                              {notification.createdAt || notification.timestamp
                                ? new Date(notification.createdAt || notification.timestamp).toLocaleString()
                                : 'Recent'}
                            </span>
                          </div>
                        </div>
                        <p className={cn(
                          'text-sm mb-2',
                          notification.read ? 'text-white/80' : 'text-white font-medium'
                        )}>
                          {notification.message || 'No message'}
                        </p>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkRead(notification._id)}
                              className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center whitespace-nowrap"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(notification._id)}
                            className="backdrop-blur-sm bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30 inline-flex items-center justify-center whitespace-nowrap"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </GlassBackground>
  );
}

