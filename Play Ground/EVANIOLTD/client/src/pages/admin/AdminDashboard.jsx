import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { Users, MessageSquare, DollarSign, TrendingUp, ShoppingCart, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    pendingTickets: 0,
    activeOrders: 0,
    totalRevenue: 0,
    recentUsers: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/users/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin />
        <div className="flex-1 md:ml-64 p-4 md:p-8 pb-20 w-full">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/80 mt-2 text-sm md:text-base">Overview of your platform</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Total Users</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
                </div>
              </div>
            </Card>

            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 border border-white/20 hover:border-green-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Active Orders</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.activeOrders}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
                </div>
              </div>
            </Card>

            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 border border-white/20 hover:border-orange-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Pending Tickets</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.pendingTickets}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-300" />
                </div>
              </div>
            </Card>

            <Card glass className="hover:scale-105 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-white/20 hover:border-purple-400/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-white/70 mb-1">Total Revenue</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    ${stats.totalRevenue?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-purple-300" />
                </div>
              </div>
            </Card>
          </div>

          <Card glass className="overflow-hidden">
            <div className="p-4 md:p-6 border-b border-white/10">
              <h2 className="text-lg md:text-xl font-semibold text-white">Recent Users</h2>
            </div>
            <div className="p-4 md:p-6">
              {stats.recentUsers?.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/80">No recent users</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.recentUsers?.map((user) => (
                    <div key={user._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-white/5 to-white/0 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{user.name}</p>
                          <p className="text-xs md:text-sm text-white/70 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs md:text-sm text-white/70">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                        <Link to={`/admin/users`}>
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


