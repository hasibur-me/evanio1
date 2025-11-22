import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { 
  MessageSquare, 
  Send, 
  User, 
  Shield, 
  X, 
  Filter,
  Search,
  ChevronLeft,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Tag,
  UserPlus,
  Edit3,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Archive
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  
  // Reply/Update State
  const [replyMessage, setReplyMessage] = useState('');
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [tags, setTags] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchStats();
    fetchUsers();
    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      fetchTickets();
      fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, statusFilter, priorityFilter, typeFilter, assignedFilter]);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/tickets/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      setSelectedTicket(response.data);
      setStatus(response.data.status);
      setPriority(response.data.priority);
      setAssignedTo(response.data.assignedTo?._id || '');
      setInternalNotes(response.data.internalNotes || '');
      setTags((response.data.tags || []).join(', '));
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.type === typeFilter);
    }

    if (assignedFilter !== 'all') {
      if (assignedFilter === 'unassigned') {
        filtered = filtered.filter(ticket => !ticket.assignedTo);
      } else {
        filtered = filtered.filter(ticket => ticket.assignedTo?._id === assignedFilter);
      }
    }

    // Sort by priority and date
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredTickets(filtered);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    
    try {
      setIsReplying(true);
      await api.post(`/tickets/${selectedTicket._id}/reply`, {
        message: replyMessage,
        status,
        priority,
        internalNotes: internalNotes || undefined
      });
      setReplyMessage('');
      await fetchTicketDetails(selectedTicket._id);
      fetchTickets();
      fetchStats();
    } catch (error) {
      console.error('Error replying to ticket:', error);
      alert('Error sending reply');
    } finally {
      setIsReplying(false);
    }
  };

  const handleUpdateTicket = async () => {
    try {
      const updateData = {
        status,
        priority,
        assignedTo: assignedTo || null,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        internalNotes: internalNotes || ''
      };
      
      await api.put(`/tickets/${selectedTicket._id}`, updateData);
      await fetchTicketDetails(selectedTicket._id);
      fetchTickets();
      fetchStats();
      alert('Ticket updated successfully');
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'open': { label: 'Open', class: 'bg-green-500/30 text-green-200 border-green-400/50' },
      'in-progress': { label: 'In Progress', class: 'bg-blue-500/30 text-blue-200 border-blue-400/50' },
      'resolved': { label: 'Resolved', class: 'bg-purple-500/30 text-purple-200 border-purple-400/50' },
      'closed': { label: 'Closed', class: 'bg-gray-500/30 text-gray-200 border-gray-400/50' }
    };
    const config = statusConfig[status] || statusConfig['open'];
    return (
      <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border', config.class)}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'low': { label: 'Low', class: 'bg-gray-500/30 text-gray-200 border-gray-400/50' },
      'medium': { label: 'Medium', class: 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50' },
      'high': { label: 'High', class: 'bg-orange-500/30 text-orange-200 border-orange-400/50' },
      'urgent': { label: 'Urgent', class: 'bg-red-500/30 text-red-200 border-red-400/50' }
    };
    const config = priorityConfig[priority] || priorityConfig['medium'];
    return (
      <span className={cn('inline-block px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border', config.class)}>
        {config.label}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const adminUsers = users.filter(u => u.role === 'admin');

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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Premium Ticket Management</h1>
              <p className="text-white/80 mt-2">Manage and respond to all support tickets with advanced features</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowStats(!showStats)}
                className="backdrop-blur-sm bg-purple-600/80 border border-purple-500/50 text-white hover:bg-purple-600/90 inline-flex items-center justify-center whitespace-nowrap"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </Button>
            </div>
          </div>

          {/* Statistics Dashboard */}
          {showStats && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Total Tickets</p>
                    <p className="text-3xl font-bold text-white">{stats.total || 0}</p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-blue-400/70" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Open</p>
                    <p className="text-3xl font-bold text-green-400">{stats.open || 0}</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-green-400/70" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.inProgress || 0}</p>
                  </div>
                  <Clock className="w-10 h-10 text-blue-400/70" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Urgent</p>
                    <p className="text-3xl font-bold text-red-400">{stats.urgent || 0}</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-red-400/70" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Resolved</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.resolved || 0}</p>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-purple-400/70" />
                </div>
              </Card>
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Closed</p>
                    <p className="text-3xl font-bold text-gray-400">{stats.closed || 0}</p>
                  </div>
                  <Archive className="w-10 h-10 text-gray-400/70" />
                </div>
              </Card>
            </div>
          )}

          {!selectedTicket && (
            <>
              {/* Advanced Filters */}
              <Card glass className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <Input
                        glass
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tickets, users, subjects..."
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
                    <option value="open" className="bg-gray-800">Open</option>
                    <option value="in-progress" className="bg-gray-800">In Progress</option>
                    <option value="resolved" className="bg-gray-800">Resolved</option>
                    <option value="closed" className="bg-gray-800">Closed</option>
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                  >
                    <option value="all" className="bg-gray-800">All Priority</option>
                    <option value="low" className="bg-gray-800">Low</option>
                    <option value="medium" className="bg-gray-800">Medium</option>
                    <option value="high" className="bg-gray-800">High</option>
                    <option value="urgent" className="bg-gray-800">Urgent</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                  >
                    <option value="all" className="bg-gray-800">All Types</option>
                    <option value="support" className="bg-gray-800">Support</option>
                    <option value="order" className="bg-gray-800">Order</option>
                    <option value="inquiry" className="bg-gray-800">Inquiry</option>
                    <option value="technical" className="bg-gray-800">Technical</option>
                    <option value="billing" className="bg-gray-800">Billing</option>
                    <option value="feature" className="bg-gray-800">Feature</option>
                  </select>
                  <select
                    value={assignedFilter}
                    onChange={(e) => setAssignedFilter(e.target.value)}
                    className="px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                  >
                    <option value="all" className="bg-gray-800">All Assignments</option>
                    <option value="unassigned" className="bg-gray-800">Unassigned</option>
                    {adminUsers.map(user => (
                      <option key={user._id} value={user._id} className="bg-gray-800">
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Card>

              {filteredTickets.length === 0 ? (
                <Card glass>
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white/80">
                      {tickets.length === 0 ? 'No tickets yet.' : 'No tickets match your filters.'}
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <Card
                      key={ticket._id}
                      glass
                      className="cursor-pointer hover:bg-white/25 transition-all"
                      onClick={() => fetchTicketDetails(ticket._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2 flex-wrap">
                            <h3 className="font-semibold text-lg text-white">{ticket.subject}</h3>
                            {ticket.ticketNumber && (
                              <span className="text-xs text-white/60 font-mono">
                                #{ticket.ticketNumber}
                              </span>
                            )}
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                            {ticket.type && (
                              <span className="text-xs px-2 py-1 rounded backdrop-blur-sm bg-purple-500/30 text-purple-200 border border-purple-400/50 capitalize">
                                {ticket.type}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mb-2 text-sm text-white/70">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{ticket.userId?.name || 'Unknown'}</span>
                            </div>
                            <span>{ticket.userId?.email}</span>
                            {ticket.assignedTo && (
                              <div className="flex items-center space-x-1 text-yellow-400">
                                <UserPlus className="w-4 h-4" />
                                <span>Assigned: {ticket.assignedTo.name}</span>
                              </div>
                            )}
                            {!ticket.assignedTo && (
                              <span className="text-orange-400">Unassigned</span>
                            )}
                          </div>
                          <p className="text-white/80 mb-2 line-clamp-2">{ticket.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            {ticket.replies && ticket.replies.length > 0 && (
                              <span className="text-blue-400">
                                {ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                            {ticket.tags && ticket.tags.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Tag className="w-3 h-3" />
                                <span>{ticket.tags.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusIcon(ticket.status)}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {selectedTicket && (
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTicket(null);
                  setReplyMessage('');
                  setInternalNotes('');
                  setTags('');
                }}
                className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Tickets
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Ticket Details */}
                  <Card glass>
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3 flex-wrap">
                          <h2 className="text-2xl font-bold text-white">{selectedTicket.subject}</h2>
                          {selectedTicket.ticketNumber && (
                            <span className="text-sm text-white/60 font-mono">
                              #{selectedTicket.ticketNumber}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 flex-wrap">
                          {getStatusBadge(selectedTicket.status)}
                          {getPriorityBadge(selectedTicket.priority)}
                          {selectedTicket.type && (
                            <span className="text-xs px-2 py-1 rounded backdrop-blur-sm bg-purple-500/30 text-purple-200 border border-purple-400/50 capitalize">
                              {selectedTicket.type}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/70">
                          Created: {new Date(selectedTicket.createdAt).toLocaleString()}
                        </p>
                        {selectedTicket.assignedTo && (
                          <p className="text-sm text-yellow-400 mt-1">
                            Assigned: {selectedTicket.assignedTo.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Conversation Thread */}
                    <div className="space-y-4 mb-6 max-h-[600px] overflow-y-auto pr-2">
                      {/* Initial Message */}
                      <div className="flex justify-end">
                        <div className="max-w-2xl">
                          <div className="flex items-end space-x-2 justify-end mb-1">
                            <User className="w-4 h-4 text-white/70" />
                            <span className="text-xs text-white/70 font-medium">{selectedTicket.userId?.name || 'User'}</span>
                            <span className="text-xs text-white/50">
                              {new Date(selectedTicket.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="backdrop-blur-sm bg-blue-500/30 rounded-2xl rounded-br-none px-4 py-3 border border-blue-400/50">
                            <p className="text-white whitespace-pre-wrap">{selectedTicket.message}</p>
                            {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {selectedTicket.attachments.map((file, idx) => (
                                  <a
                                    key={idx}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-blue-200 hover:text-blue-100 text-sm"
                                  >
                                    <FileText className="w-4 h-4" />
                                    <span>{file.filename}</span>
                                    <Download className="w-3 h-3" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Replies */}
                      {selectedTicket.replies && selectedTicket.replies.map((reply, idx) => (
                        <div key={idx} className={reply.isAdmin ? 'flex justify-start' : 'flex justify-end'}>
                          <div className="max-w-2xl">
                            <div className={cn(
                              "flex items-end space-x-2 mb-1",
                              reply.isAdmin ? "justify-start" : "justify-end"
                            )}>
                              {reply.isAdmin ? (
                                <Shield className="w-4 h-4 text-white/70" />
                              ) : (
                                <User className="w-4 h-4 text-white/70" />
                              )}
                              <span className="text-xs text-white/70 font-medium">
                                {reply.isAdmin ? 'Admin' : (reply.userId?.name || 'User')}
                              </span>
                              <span className="text-xs text-white/50">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className={cn(
                              "backdrop-blur-sm rounded-2xl px-4 py-3 border",
                              reply.isAdmin
                                ? "bg-white/20 rounded-bl-none border-white/30"
                                : "bg-blue-500/30 rounded-br-none border-blue-400/50"
                            )}>
                              <p className="text-white whitespace-pre-wrap">{reply.message}</p>
                              {reply.attachments && reply.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {reply.attachments.map((file, fileIdx) => (
                                    <a
                                      key={fileIdx}
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-2 text-blue-200 hover:text-blue-100 text-sm"
                                    >
                                      <FileText className="w-4 h-4" />
                                      <span>{file.filename}</span>
                                      <Download className="w-3 h-3" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    {selectedTicket.status !== 'closed' && (
                      <div className="border-t border-white/20 pt-6">
                        <form onSubmit={handleReply} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                              Add Reply
                            </label>
                            <Textarea
                              glass
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              required
                              rows={4}
                              placeholder="Type your reply here..."
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              type="submit"
                              disabled={isReplying || !replyMessage.trim()}
                              className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {isReplying ? 'Sending...' : 'Send Reply'}
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {selectedTicket.status === 'closed' && (
                      <div className="border-t border-white/20 pt-4">
                        <p className="text-sm text-white/80">
                          This ticket is closed. Reopen it to continue the conversation.
                        </p>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Sidebar - Ticket Management */}
                <div className="space-y-6">
                  <Card glass>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Edit3 className="w-5 h-5 mr-2" />
                      Manage Ticket
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Status
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                        >
                          <option value="open" className="bg-gray-800">Open</option>
                          <option value="in-progress" className="bg-gray-800">In Progress</option>
                          <option value="resolved" className="bg-gray-800">Resolved</option>
                          <option value="closed" className="bg-gray-800">Closed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Priority
                        </label>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                        >
                          <option value="low" className="bg-gray-800">Low</option>
                          <option value="medium" className="bg-gray-800">Medium</option>
                          <option value="high" className="bg-gray-800">High</option>
                          <option value="urgent" className="bg-gray-800">Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Assign To
                        </label>
                        <select
                          value={assignedTo}
                          onChange={(e) => setAssignedTo(e.target.value)}
                          className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                        >
                          <option value="" className="bg-gray-800">Unassigned</option>
                          {adminUsers.map(user => (
                            <option key={user._id} value={user._id} className="bg-gray-800">
                              {user.name} ({user.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Tags (comma-separated)
                        </label>
                        <Input
                          glass
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="bug, urgent, feature"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Internal Notes
                        </label>
                        <Textarea
                          glass
                          value={internalNotes}
                          onChange={(e) => setInternalNotes(e.target.value)}
                          rows={4}
                          placeholder="Private notes (not visible to user)..."
                        />
                      </div>
                      <Button 
                        onClick={handleUpdateTicket}
                        className="w-full backdrop-blur-sm bg-green-600/80 border border-green-500/50 text-white hover:bg-green-600/90 inline-flex items-center justify-center whitespace-nowrap"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Update Ticket
                      </Button>
                    </div>
                  </Card>

                  {/* User Info */}
                  <Card glass>
                    <h3 className="text-lg font-semibold text-white mb-4">User Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-white/70">Name:</span>
                        <p className="text-white">{selectedTicket.userId?.name || 'Unknown'}</p>
                      </div>
                      <div>
                        <span className="text-white/70">Email:</span>
                        <p className="text-white">{selectedTicket.userId?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-white/70">Created:</span>
                        <p className="text-white">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-white/70">Last Updated:</span>
                        <p className="text-white">{new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                      </div>
                      {selectedTicket.tags && selectedTicket.tags.length > 0 && (
                        <div>
                          <span className="text-white/70">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTicket.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 rounded backdrop-blur-sm bg-purple-500/30 text-purple-200 border border-purple-400/50">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}
