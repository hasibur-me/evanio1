import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  Users,
  Bell,
  Upload,
  LogOut,
  ShoppingBag,
  Mail,
  Calendar,
  Star,
  Target,
  Phone,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

const userMenuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/project-status', label: 'Project Status', icon: Target },
  { path: '/dashboard/services', label: 'Services', icon: FileText },
  { path: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { path: '/dashboard/referrals', label: 'Referrals', icon: Users },
  { path: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  { path: '/dashboard/documents', label: 'Documents', icon: FileText },
  { path: '/dashboard/tickets', label: 'Tickets', icon: MessageSquare },
  { path: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { path: '/dashboard/notifications', label: 'Notifications', icon: Bell, showBadge: true },
  { path: '/dashboard/profile', label: 'Profile', icon: Settings },
];

const adminMenuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/documents', label: 'Upload Documents', icon: Upload },
  { path: '/admin/tickets', label: 'Tickets', icon: MessageSquare },
  { path: '/admin/contacts', label: 'Contacts', icon: Phone },
  { path: '/admin/orders', label: 'Orders', icon: CreditCard },
  { path: '/admin/analytics', label: 'Analytics', icon: LayoutDashboard },
  { path: '/admin/analytics-enhanced', label: 'Advanced Analytics', icon: LayoutDashboard },
  { path: '/admin/email', label: 'Email Composer', icon: Mail },
  { path: '/admin/blog', label: 'Blog CMS', icon: FileText },
  { path: '/admin/reviews', label: 'Reviews', icon: Star },
  { path: '/admin/webhooks', label: 'Webhooks', icon: Settings },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ isAdmin = false }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  // Get unread notifications count
  const unreadCount = user?.notifications?.filter(n => !n.read).length || 0;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="mobile-menu-button fixed top-20 left-4 z-50 md:hidden p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'sidebar-container w-64 backdrop-blur-xl bg-white/10 border-r border-white/20 shadow-xl h-screen fixed left-0 top-0 pt-16 md:pt-20 overflow-y-auto z-40 transition-transform duration-300',
          'md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {isAdmin ? 'Admin Menu' : 'Dashboard Menu'}
            </h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {user && (
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-xs text-white/70 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const showBadge = item.showBadge && unreadCount > 0;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 relative group',
                  isActive
                    ? 'backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-white/30 shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={cn(
                    'w-5 h-5 transition-transform group-hover:scale-110',
                    isActive && 'text-blue-300'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {showBadge && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] animate-pulse">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
