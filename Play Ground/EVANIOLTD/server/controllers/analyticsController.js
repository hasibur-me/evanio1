import Order from '../models/Order.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import Ticket from '../models/Ticket.js';
import Document from '../models/Document.js';

// Helper function to get date range
const getDateRange = (period) => {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      endDate = new Date();
      break;
    case 'week':
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date();
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date();
      break;
    case 'custom':
      // Will be handled by custom dates
      return null;
    default:
      startDate = new Date(0); // All time
      endDate = new Date();
  }

  return { startDate, endDate };
};

// Revenue Reports
export const getRevenueReport = async (req, res) => {
  try {
    const { period = 'all', startDate, endDate, groupBy = 'day' } = req.query;

    let dateFilter = {};
    if (period === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (period !== 'all') {
      const range = getDateRange(period);
      if (range) {
        dateFilter = {
          createdAt: {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    }

    // Get completed orders with payment
    const orders = await Order.find({
      paymentStatus: 'completed',
      ...dateFilter
    }).sort({ createdAt: 1 });

    // Group by period
    const revenueData = {};
    let totalRevenue = 0;
    let totalOrders = 0;

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      let key;

      switch (groupBy) {
        case 'day':
          key = date.toISOString().split('T')[0]; // YYYY-MM-DD
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!revenueData[key]) {
        revenueData[key] = { date: key, revenue: 0, orders: 0 };
      }
      revenueData[key].revenue += order.amount || 0;
      revenueData[key].orders += 1;
      totalRevenue += order.amount || 0;
      totalOrders += 1;
    });

    const chartData = Object.values(revenueData).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    res.json({
      period,
      groupBy,
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      chartData,
      rawData: orders
    });
  } catch (error) {
    console.error('Error generating revenue report:', error);
    res.status(500).json({ message: error.message });
  }
};

// User Growth Analytics
export const getUserGrowthReport = async (req, res) => {
  try {
    const { period = 'all', startDate, endDate, groupBy = 'day' } = req.query;

    let dateFilter = {};
    if (period === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (period !== 'all') {
      const range = getDateRange(period);
      if (range) {
        dateFilter = {
          createdAt: {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    }

    const users = await User.find(dateFilter).sort({ createdAt: 1 });

    // Group by period
    const growthData = {};
    let totalUsers = 0;
    let adminCount = 0;
    let userCount = 0;

    users.forEach(user => {
      const date = new Date(user.createdAt);
      let key;

      switch (groupBy) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!growthData[key]) {
        growthData[key] = { date: key, users: 0, admins: 0, regularUsers: 0 };
      }
      growthData[key].users += 1;
      if (user.role === 'admin') {
        growthData[key].admins += 1;
        adminCount++;
      } else {
        growthData[key].regularUsers += 1;
        userCount++;
      }
      totalUsers++;
    });

    const chartData = Object.values(growthData).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Calculate growth rate
    const previousPeriodUsers = users.length > 1 ? 
      users.filter(u => {
        const userDate = new Date(u.createdAt);
        const cutoff = new Date(chartData[0]?.date || new Date());
        return userDate < cutoff;
      }).length : 0;
    
    const growthRate = previousPeriodUsers > 0 
      ? ((totalUsers - previousPeriodUsers) / previousPeriodUsers) * 100 
      : 0;

    res.json({
      period,
      groupBy,
      totalUsers,
      adminCount,
      userCount,
      growthRate: growthRate.toFixed(2),
      chartData,
      rawData: users.map(u => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    console.error('Error generating user growth report:', error);
    res.status(500).json({ message: error.message });
  }
};

// Service Performance Metrics
export const getServicePerformanceReport = async (req, res) => {
  try {
    const { period = 'all', startDate, endDate } = req.query;

    let dateFilter = {};
    if (period === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (period !== 'all') {
      const range = getDateRange(period);
      if (range) {
        dateFilter = {
          createdAt: {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    }

    const orders = await Order.find(dateFilter);

    // Group by service
    const serviceData = {};
    let totalRevenue = 0;
    let totalOrders = 0;

    orders.forEach(order => {
      const serviceName = order.service;
      if (!serviceData[serviceName]) {
        serviceData[serviceName] = {
          service: serviceName,
          orders: 0,
          revenue: 0,
          completed: 0,
          inProgress: 0,
          pending: 0,
          cancelled: 0,
          averageOrderValue: 0
        };
      }

      serviceData[serviceName].orders += 1;
      if (order.paymentStatus === 'completed') {
        serviceData[serviceName].revenue += order.amount || 0;
        totalRevenue += order.amount || 0;
      }

      // Count by status
      switch (order.orderStatus) {
        case 'completed':
          serviceData[serviceName].completed += 1;
          break;
        case 'in-progress':
          serviceData[serviceName].inProgress += 1;
          break;
        case 'pending':
        case 'confirmed':
          serviceData[serviceName].pending += 1;
          break;
        case 'cancelled':
          serviceData[serviceName].cancelled += 1;
          break;
      }

      totalOrders++;
    });

    // Calculate averages
    Object.keys(serviceData).forEach(service => {
      const data = serviceData[service];
      data.averageOrderValue = data.orders > 0 ? data.revenue / data.orders : 0;
      data.completionRate = data.orders > 0 ? (data.completed / data.orders) * 100 : 0;
    });

    const chartData = Object.values(serviceData).sort((a, b) => b.revenue - a.revenue);

    res.json({
      period,
      totalRevenue,
      totalOrders,
      services: chartData,
      topService: chartData[0] || null,
      rawData: orders
    });
  } catch (error) {
    console.error('Error generating service performance report:', error);
    res.status(500).json({ message: error.message });
  }
};

// Comprehensive Analytics Dashboard
export const getComprehensiveAnalytics = async (req, res) => {
  try {
    const { period = 'all', startDate, endDate } = req.query;

    let dateFilter = {};
    if (period === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (period !== 'all') {
      const range = getDateRange(period);
      if (range) {
        dateFilter = {
          createdAt: {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    }

    const [orders, users, payments, tickets, documents] = await Promise.all([
      Order.find(dateFilter),
      User.find(dateFilter),
      Payment.find(dateFilter),
      Ticket.find(dateFilter),
      Document.find(dateFilter)
    ]);

    // Revenue metrics
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const averageOrderValue = completedOrders.length > 0 
      ? totalRevenue / completedOrders.length 
      : 0;

    // Order metrics
    const orderStatusCounts = {
      pending: orders.filter(o => o.orderStatus === 'pending').length,
      confirmed: orders.filter(o => o.orderStatus === 'confirmed').length,
      inProgress: orders.filter(o => o.orderStatus === 'in-progress').length,
      completed: orders.filter(o => o.orderStatus === 'completed').length,
      cancelled: orders.filter(o => o.orderStatus === 'cancelled').length
    };

    // User metrics
    const userRoleCounts = {
      admin: users.filter(u => u.role === 'admin').length,
      user: users.filter(u => u.role === 'user').length
    };

    // Ticket metrics
    const ticketStatusCounts = {
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in-progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };

    res.json({
      period,
      dateRange: dateFilter,
      revenue: {
        total: totalRevenue,
        averageOrderValue,
        totalOrders: completedOrders.length,
        currency: 'USD'
      },
      orders: {
        total: orders.length,
        byStatus: orderStatusCounts
      },
      users: {
        total: users.length,
        byRole: userRoleCounts,
        newUsers: users.length
      },
      tickets: {
        total: tickets.length,
        byStatus: ticketStatusCounts
      },
      documents: {
        total: documents.length
      }
    });
  } catch (error) {
    console.error('Error generating comprehensive analytics:', error);
    res.status(500).json({ message: error.message });
  }
};

// Export data as CSV
export const exportDataAsCSV = async (req, res) => {
  try {
    const { type, period = 'all', startDate, endDate } = req.query;

    let dateFilter = {};
    if (period === 'custom' && startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else if (period !== 'all') {
      const range = getDateRange(period);
      if (range) {
        dateFilter = {
          createdAt: {
            $gte: range.startDate,
            $lte: range.endDate
          }
        };
      }
    }

    let csv = '';
    let filename = '';

    switch (type) {
      case 'revenue':
        const orders = await Order.find({
          paymentStatus: 'completed',
          ...dateFilter
        }).populate('userId', 'name email');

        csv = 'Date,Order Number,Service,Amount,User,Payment Method,Status\n';
        orders.forEach(order => {
          csv += `${new Date(order.createdAt).toISOString().split('T')[0]},${order.orderNumber},"${order.service}",${order.amount},"${order.userId?.name || 'N/A'}","${order.paymentMethod}",${order.orderStatus}\n`;
        });
        filename = `revenue-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      case 'users':
        const users = await User.find(dateFilter);
        csv = 'Date,Name,Email,Role,Phone,City,Country\n';
        users.forEach(user => {
          csv += `${new Date(user.createdAt).toISOString().split('T')[0]},"${user.name}","${user.email}",${user.role},"${user.phoneNumber || ''}","${user.city || ''}","${user.country || ''}"\n`;
        });
        filename = `users-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      case 'orders':
        const allOrders = await Order.find(dateFilter).populate('userId', 'name email');
        csv = 'Date,Order Number,Service,Amount,User,Payment Status,Order Status\n';
        allOrders.forEach(order => {
          csv += `${new Date(order.createdAt).toISOString().split('T')[0]},${order.orderNumber},"${order.service}",${order.amount},"${order.userId?.name || 'N/A'}",${order.paymentStatus},${order.orderStatus}\n`;
        });
        filename = `orders-report-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ message: error.message });
  }
};

