import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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
import { Download, Calendar, TrendingUp, Users, DollarSign, Package, Filter } from 'lucide-react';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';

const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

export default function AdminAnalyticsEnhanced() {
  const [period, setPeriod] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupBy, setGroupBy] = useState('day');
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [comprehensiveData, setComprehensiveData] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, [period, startDate, endDate, groupBy]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        period: period === 'custom' ? 'custom' : period,
        groupBy
      });
      
      if (period === 'custom' && startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      const [revenueRes, usersRes, servicesRes, comprehensiveRes] = await Promise.all([
        api.get(`/analytics/revenue?${params}`),
        api.get(`/analytics/users?${params}`),
        api.get(`/analytics/services?${params}`),
        api.get(`/analytics/comprehensive?${params}`)
      ]);

      setRevenueData(revenueRes.data);
      setUserGrowthData(usersRes.data);
      setServiceData(servicesRes.data);
      setComprehensiveData(comprehensiveRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type) => {
    try {
      const params = new URLSearchParams({
        type,
        period: period === 'custom' ? 'custom' : period
      });
      
      if (period === 'custom' && startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      const response = await api.get(`/analytics/export?${params}`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    }
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-[calc(100vh-200px)]">
          <Sidebar isAdmin />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
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
          {/* User Behavior Analytics */}
          <div className="mb-8">
            <AnalyticsDashboard isAdmin={true} />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
                <p className="text-white/80 mt-2">Comprehensive reports and insights</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleExport('revenue')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Revenue
                </Button>
                <Button
                  onClick={() => handleExport('users')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Users
                </Button>
                <Button
                  onClick={() => handleExport('orders')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Orders
                </Button>
              </div>
            </div>
          </div>

          {/* Date Range Filters */}
          <Card glass className="mb-6 p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-white/70" />
                <span className="text-white/90 font-medium">Period:</span>
              </div>
              <select
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (e.target.value !== 'custom') {
                    setStartDate('');
                    setEndDate('');
                  }
                }}
                className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
                <option value="custom">Custom Range</option>
              </select>

              {period === 'custom' && (
                <>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-white/70">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-white/90 font-medium">Group By:</span>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Summary Cards */}
          {comprehensiveData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-white">
                      ${comprehensiveData.revenue?.total?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      Avg: ${comprehensiveData.revenue?.averageOrderValue?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-400" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-white">
                      {comprehensiveData.users?.total || 0}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      New: {comprehensiveData.users?.newUsers || 0}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-blue-400" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-white">
                      {comprehensiveData.orders?.total || 0}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      Completed: {comprehensiveData.orders?.byStatus?.completed || 0}
                    </p>
                  </div>
                  <Package className="w-10 h-10 text-purple-400" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">User Growth</p>
                    <p className="text-3xl font-bold text-white">
                      {userGrowthData?.growthRate ? `${userGrowthData.growthRate}%` : '0%'}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      {userGrowthData?.totalUsers || 0} total
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-yellow-400" />
                </div>
              </Card>
            </div>
          )}

          {/* Revenue Chart */}
          {revenueData && (
            <Card glass className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Revenue Report</h2>
              {revenueData.chartData && revenueData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
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
                <div className="h-[400px] flex items-center justify-center text-white/60">
                  No revenue data for selected period
                </div>
              )}
            </Card>
          )}

          {/* User Growth Chart */}
          {userGrowthData && (
            <Card glass className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">User Growth Analytics</h2>
              {userGrowthData.chartData && userGrowthData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
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
                    <Line type="monotone" dataKey="regularUsers" stroke="#60a5fa" strokeWidth={2} />
                    <Line type="monotone" dataKey="admins" stroke="#f87171" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-white/60">
                  No user growth data for selected period
                </div>
              )}
            </Card>
          )}

          {/* Service Performance */}
          {serviceData && (
            <Card glass>
              <h2 className="text-xl font-semibold mb-4 text-white">Service Performance Metrics</h2>
              {serviceData.services && serviceData.services.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={serviceData.services.slice(0, 5).map(s => ({
                            name: s.service,
                            value: s.revenue
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {serviceData.services.slice(0, 5).map((entry, index) => (
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
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white mb-3">Top Services</h3>
                      {serviceData.services.slice(0, 5).map((service, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium">{service.service}</span>
                            <span className="text-green-400 font-semibold">${service.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/70">
                            <span>{service.orders} orders</span>
                            <span>{service.completionRate.toFixed(1)}% completion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-white/60">
                  No service performance data for selected period
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

