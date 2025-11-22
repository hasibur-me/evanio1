import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

export default function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [usersRes, paymentsRes, ticketsRes, ordersRes, documentsRes] = await Promise.all([
        api.get('/users').catch(() => ({ data: [] })),
        api.get('/payments').catch(() => ({ data: [] })),
        api.get('/tickets').catch(() => ({ data: [] })),
        api.get('/orders/admin/all').catch(() => ({ data: [] })),
        api.get('/documents/admin/all').catch(() => ({ data: [] })),
      ]);
      
      setUsers(usersRes.data || []);
      setPayments(paymentsRes.data || []);
      setTickets(ticketsRes.data || []);
      setOrders(ordersRes.data || []);
      setDocuments(documentsRes.data || []);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Process data for charts - Revenue from orders (more accurate than payments)
  const monthlyRevenue = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((acc, order) => {
      const date = order.createdAt || order.timestamp || new Date();
      const month = new Date(date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + (order.amount || 0);
      return acc;
    }, {});

  // Sort months chronologically
  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = Object.entries(monthlyRevenue)
    .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
    .map(([month, amount]) => ({
      month,
      revenue: amount,
    }));

  // User registration data
  const userRegistrationData = (users || []).reduce((acc, user) => {
    if (!user.createdAt) return acc;
    const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const userData = Object.entries(userRegistrationData)
    .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
    .map(([month, count]) => ({
      month,
      users: count,
    }));

  // Ticket status data
  const ticketStatusData = [
    { name: 'Open', value: (tickets || []).filter(t => t.status === 'open').length },
    { name: 'Closed', value: (tickets || []).filter(t => t.status === 'closed').length },
    { name: 'In Progress', value: (tickets || []).filter(t => t.status === 'in-progress').length },
  ].filter(item => item.value > 0);

  // Payment status data from orders
  const paymentStatusData = [
    { name: 'Completed', value: (orders || []).filter(o => o.paymentStatus === 'completed').length },
    { name: 'Pending', value: (orders || []).filter(o => o.paymentStatus === 'pending').length },
    { name: 'Failed', value: (orders || []).filter(o => o.paymentStatus === 'failed').length },
  ].filter(item => item.value > 0);

  // Orders status data
  const ordersData = [
    { name: 'Completed', value: (orders || []).filter(o => o.orderStatus === 'completed').length },
    { name: 'In Progress', value: (orders || []).filter(o => o.orderStatus === 'in-progress').length },
    { name: 'Confirmed', value: (orders || []).filter(o => o.orderStatus === 'confirmed').length },
    { name: 'Pending', value: (orders || []).filter(o => o.orderStatus === 'pending').length },
  ].filter(item => item.value > 0);

  // Calculate totals
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalDocuments = documents.length;

  if (loading) {
    return (
      <GlassBackground>
        <div className="flex min-h-screen">
          <Sidebar isAdmin />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
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
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-white/80 mt-2">Platform insights and metrics</p>
          </div>

          {error && (
            <Card glass className="mb-6 p-4 bg-red-500/20 border border-red-400/50">
              <p className="text-red-200">{error}</p>
            </Card>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 border border-green-400/50 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-white">{totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-400/50 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-white">{totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-400/50 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </Card>
            <Card glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70 mb-1">Total Documents</p>
                  <p className="text-3xl font-bold text-white">{totalDocuments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-400/50 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">Monthly Revenue</h2>
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                    />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Bar dataKey="revenue" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No revenue data available
                </div>
              )}
            </Card>

            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">User Registrations</h2>
              {userData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Legend wrapperStyle={{ color: '#fff' }} />
                    <Line type="monotone" dataKey="users" stroke="#34d399" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No user registration data available
                </div>
              )}
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">Ticket Status</h2>
              {ticketStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ticketStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No ticket data available
                </div>
              )}
            </Card>

            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">Payment Status</h2>
              {paymentStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No payment data available
                </div>
              )}
            </Card>

            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">Orders Status</h2>
              {ordersData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ordersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ordersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No order data available
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}


