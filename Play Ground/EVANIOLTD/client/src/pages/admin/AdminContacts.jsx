import { useState, useEffect, useCallback } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  User, 
  Search,
  Filter,
  Download,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Archive,
  RefreshCw,
  Calendar,
  TrendingUp,
  Users as UsersIcon
} from 'lucide-react';

const STATUS_COLORS = {
  new: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
  contacted: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
  in_progress: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
  resolved: 'bg-green-500/20 text-green-300 border-green-400/50',
  archived: 'bg-gray-500/20 text-gray-300 border-gray-400/50',
};

const SOURCE_COLORS = {
  contact_form: 'bg-blue-500/20 text-blue-300',
  chat: 'bg-green-500/20 text-green-300',
  email: 'bg-purple-500/20 text-purple-300',
  phone: 'bg-yellow-500/20 text-yellow-300',
  other: 'bg-gray-500/20 text-gray-300',
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [stats, setStats] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Form state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const currentPage = page;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '50',
      });
      
      // Only add status filter if it's not 'all'
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      // Only add source filter if it's not 'all'
      if (sourceFilter && sourceFilter !== 'all') {
        params.append('source', sourceFilter);
      }
      
      // Only add search if there's a query
      if (searchQuery && searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      console.log('Fetching contacts - Status:', statusFilter, 'Source:', sourceFilter, 'Page:', currentPage);
      console.log('API URL params:', params.toString());

      const response = await api.get(`/contact/admin?${params.toString()}`);
      
      console.log('Received contacts:', response.data.contacts.length, 'Total:', response.data.total);
      
      setContacts(response.data.contacts);
      setFilteredContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
      
      // Calculate stats (only on initial load or when filters are cleared)
      if (statusFilter === 'all' && sourceFilter === 'all' && !searchQuery) {
        calculateStats();
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      console.error('Error response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, sourceFilter, searchQuery]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
  }, [statusFilter, sourceFilter]);

  useEffect(() => {
    fetchContacts();
    // Auto-refresh every 30 seconds to catch new submissions
    const interval = setInterval(() => {
      fetchContacts();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchContacts]);

  useEffect(() => {
    // Debounce search query
    const timeoutId = setTimeout(() => {
      setPage(1);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const calculateStats = async () => {
    try {
      // Fetch all contacts for stats (without pagination)
      const response = await api.get('/contact/admin?limit=10000');
      const allContacts = response.data.contacts;
      
      const statsData = {
        total: response.data.total || allContacts.length,
        new: allContacts.filter(c => c.status === 'new').length,
        contacted: allContacts.filter(c => c.status === 'contacted').length,
        resolved: allContacts.filter(c => c.status === 'resolved').length,
        chat: allContacts.filter(c => c.source === 'chat').length,
        contactForm: allContacts.filter(c => c.source === 'contact_form').length,
      };
      setStats(statsData);
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  // Removed local filterContacts - filtering is now done server-side

  const handleViewContact = async (contactId) => {
    try {
      const response = await api.get(`/contact/admin/${contactId}`);
      setSelectedContact(response.data);
      setUpdateStatus(response.data.status);
      setUpdateNotes(response.data.notes || '');
      setShowUpdateModal(true);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const handleUpdateContact = async () => {
    if (!selectedContact) return;

    try {
      await api.put(`/contact/admin/${selectedContact._id}`, {
        status: updateStatus,
        notes: updateNotes,
      });
      
      setShowUpdateModal(false);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact');
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await api.delete(`/contact/admin/${contactId}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const exportContacts = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'WhatsApp', 'Source', 'Status', 'Service', 'Date'].join(','),
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.whatsapp || '',
        contact.source,
        contact.status,
        contact.service || '',
        new Date(contact.createdAt).toLocaleDateString(),
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && contacts.length === 0) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
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
        <div className="flex-1 md:ml-64 p-4 md:p-8 pb-20 w-full">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Contact Submissions</h1>
                <p className="text-white/80 mt-2 text-sm md:text-base">Manage all contact form and chat submissions</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={exportContacts}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button
                  onClick={fetchContacts}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <UsersIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-white/70">Total</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </Card>
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-white/70">New</span>
                </div>
                <p className="text-2xl font-bold text-blue-300">{stats.new}</p>
              </Card>
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-white/70">Chat</span>
                </div>
                <p className="text-2xl font-bold text-green-300">{stats.chat}</p>
              </Card>
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-white/70">Form</span>
                </div>
                <p className="text-2xl font-bold text-purple-300">{stats.contactForm}</p>
              </Card>
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-white/70">Contacted</span>
                </div>
                <p className="text-2xl font-bold text-yellow-300">{stats.contacted}</p>
              </Card>
              <Card glass className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-white/70">Resolved</span>
                </div>
                <p className="text-2xl font-bold text-green-300">{stats.resolved}</p>
              </Card>
            </div>
          )}

          {/* Filters */}
          <Card glass className="p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-white/70 flex-shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative z-10 min-w-[150px]"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="all" className="bg-gray-800">All Status</option>
                  <option value="new" className="bg-gray-800">New</option>
                  <option value="contacted" className="bg-gray-800">Contacted</option>
                  <option value="in_progress" className="bg-gray-800">In Progress</option>
                  <option value="resolved" className="bg-gray-800">Resolved</option>
                  <option value="archived" className="bg-gray-800">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer relative z-10 min-w-[150px]"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="all" className="bg-gray-800">All Sources</option>
                  <option value="chat" className="bg-gray-800">Chat</option>
                  <option value="contact_form" className="bg-gray-800">Contact Form</option>
                  <option value="email" className="bg-gray-800">Email</option>
                  <option value="phone" className="bg-gray-800">Phone</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Contacts Table - Desktop */}
          <Card glass className="overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Phone/WhatsApp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-white/70">
                        No contacts found
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-white/50" />
                            <span className="text-white">{contact.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-white/50" />
                            <span className="text-white/90">{contact.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            {contact.phone && (
                              <div className="flex items-center gap-1 text-white/80 text-sm">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </div>
                            )}
                            {contact.whatsapp && (
                              <div className="flex items-center gap-1 text-green-300 text-sm">
                                <MessageCircle className="w-3 h-3" />
                                {contact.whatsapp}
                              </div>
                            )}
                            {!contact.phone && !contact.whatsapp && (
                              <span className="text-white/50 text-sm">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${SOURCE_COLORS[contact.source] || SOURCE_COLORS.other}`}>
                            {contact.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${STATUS_COLORS[contact.status] || STATUS_COLORS.new}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/70 text-sm">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewContact(contact._id)}
                              className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Contacts Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {filteredContacts.length === 0 ? (
              <Card glass className="p-8 text-center">
                <p className="text-white/70">No contacts found</p>
              </Card>
            ) : (
              filteredContacts.map((contact) => (
                <Card glass key={contact._id} className="p-4 hover:bg-white/10 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {contact.name?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{contact.name}</p>
                          <p className="text-xs text-white/70 truncate">{contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleViewContact(contact._id)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                      <div>
                        <p className="text-xs text-white/60 mb-1">Phone/WhatsApp</p>
                        <div className="space-y-1">
                          {contact.phone && (
                            <div className="flex items-center gap-1 text-white/80 text-sm">
                              <Phone className="w-3 h-3" />
                              <span className="truncate">{contact.phone}</span>
                            </div>
                          )}
                          {contact.whatsapp && (
                            <div className="flex items-center gap-1 text-green-300 text-sm">
                              <MessageCircle className="w-3 h-3" />
                              <span className="truncate">{contact.whatsapp}</span>
                            </div>
                          )}
                          {!contact.phone && !contact.whatsapp && (
                            <span className="text-white/50 text-sm">-</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Source</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${SOURCE_COLORS[contact.source] || SOURCE_COLORS.other}`}>
                          {contact.source}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Status</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${STATUS_COLORS[contact.status] || STATUS_COLORS.new}`}>
                          {contact.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Date</p>
                        <p className="text-white/70 text-sm">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Desktop Pagination */}
          {totalPages > 1 && (
            <div className="hidden md:flex items-center justify-between gap-4 p-4 bg-white/5 rounded-lg border border-white/10 mt-4">
              <p className="text-sm text-white/70">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 rounded-lg transition-colors"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 rounded-lg transition-colors"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className="md:hidden flex items-center justify-between gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/70">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 rounded-lg transition-colors"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 rounded-lg transition-colors"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Update Modal */}
          {showUpdateModal && selectedContact && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
              <Card glass className="max-w-2xl w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Contact Details</h2>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Name</label>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Email</label>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Phone</label>
                      <p className="text-white">{selectedContact.phone || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">WhatsApp</label>
                      <p className="text-white">{selectedContact.whatsapp || '-'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Source</label>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${SOURCE_COLORS[selectedContact.source] || SOURCE_COLORS.other}`}>
                      {selectedContact.source}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Service</label>
                    <p className="text-white">{selectedContact.service || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Message</label>
                    <p className="text-white/90">{selectedContact.message || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Status</label>
                    <select
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Notes</label>
                    <textarea
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      placeholder="Add notes about this contact..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateContact}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update Contact
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

