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
  Paperclip,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Plus,
  ChevronLeft,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('support');
  const [priority, setPriority] = useState('medium');
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchTickets();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch orders when form is shown
    if (showForm) {
      fetchOrders();
    }
  }, [showForm]);

  // Check for orderId in URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('orderId');
    if (orderIdParam) {
      // Open the form and set the order
      setShowForm(true);
      setOrderId(orderIdParam);
      // Remove orderId from URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, statusFilter, priorityFilter, typeFilter]);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/tickets');
      setTickets(response.data);
      if (selectedTicket) {
        const updated = response.data.find(t => t._id === selectedTicket._id);
        if (updated) setSelectedTicket(updated);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await api.get('/orders/my-orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      setSelectedTicket(response.data);
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
        ticket.message?.toLowerCase().includes(searchQuery.toLowerCase())
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

    setFilteredTickets(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tickets', { 
        subject, 
        message, 
        type, 
        priority,
        orderId: orderId || undefined
      });
      setSubject('');
      setMessage('');
      setType('support');
      setPriority('medium');
      setOrderId('');
      setShowForm(false);
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert(error.response?.data?.message || 'Error creating ticket');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    
    try {
      setIsReplying(true);
      await api.post(`/tickets/${selectedTicket._id}/reply`, {
        message: replyMessage
      });
      setReplyMessage('');
      await fetchTicketDetails(selectedTicket._id);
      fetchTickets();
    } catch (error) {
      console.error('Error replying to ticket:', error);
      alert('Error sending reply');
    } finally {
      setIsReplying(false);
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

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
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
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Premium Ticket Management</h1>
              <p className="text-white/80 mt-2">Create and manage your support tickets with advanced features</p>
            </div>
            <Button 
              onClick={() => {
                setShowForm(!showForm);
                setSelectedTicket(null);
              }}
              className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 inline-flex items-center justify-center whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>

          {showForm && (
            <Card glass className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Create New Ticket</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(false)}
                  className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                      required
                    >
                      <option value="support" className="bg-gray-800">Support</option>
                      <option value="order" className="bg-gray-800">Order</option>
                      <option value="inquiry" className="bg-gray-800">Inquiry</option>
                      <option value="technical" className="bg-gray-800">Technical</option>
                      <option value="billing" className="bg-gray-800">Billing</option>
                      <option value="feature" className="bg-gray-800">Feature Request</option>
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
                      required
                    >
                      <option value="low" className="bg-gray-800">Low</option>
                      <option value="medium" className="bg-gray-800">Medium</option>
                      <option value="high" className="bg-gray-800">High</option>
                      <option value="urgent" className="bg-gray-800">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Link to Order <span className="text-white/60 text-xs font-normal">(Optional)</span>
                  </label>
                  {loadingOrders ? (
                    <div className="px-4 py-2.5 text-white/70">Loading orders...</div>
                  ) : (
                    <select
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                    >
                      <option value="" className="bg-gray-800">None (General Support)</option>
                      {orders.map((order) => (
                        <option key={order._id} value={order._id} className="bg-gray-800">
                          {order.orderNumber} - {order.service} (${order.amount?.toFixed(2) || '0.00'})
                        </option>
                      ))}
                    </select>
                  )}
                  {orders.length === 0 && !loadingOrders && (
                    <p className="text-xs text-white/60 mt-1">
                      No orders found. You can still create a ticket without linking to an order.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Subject
                  </label>
                  <Input
                    glass
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Enter ticket subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Message
                  </label>
                  <Textarea
                    glass
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    type="submit"
                    className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 inline-flex items-center justify-center whitespace-nowrap"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {!selectedTicket && (
            <>
              {/* Filters */}
              <Card glass className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <Input
                        glass
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tickets..."
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
                </div>
              </Card>

              {filteredTickets.length === 0 ? (
                <Card glass>
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white/80">
                      {tickets.length === 0 ? 'No tickets yet. Create your first ticket!' : 'No tickets match your filters.'}
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
                          <p className="text-white/80 mb-2 line-clamp-2">{ticket.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-white/60 flex-wrap">
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            {ticket.replies && ticket.replies.length > 0 && (
                              <span className="text-blue-400">
                                {ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                            {ticket.assignedTo && (
                              <span className="text-yellow-400">Assigned</span>
                            )}
                            {ticket.orderId && (
                              <span className="flex items-center gap-1 text-blue-400">
                                <ShoppingBag className="w-3 h-3" />
                                Linked Order
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusIcon(ticket.status)}
                          <MessageSquare className="w-5 h-5 text-white/50" />
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
                }}
                className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Tickets
              </Button>

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
                    {selectedTicket.orderId && (
                      <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <ShoppingBag className="w-4 h-4 text-blue-300" />
                          <span className="text-sm font-medium text-white">Linked Order:</span>
                        </div>
                        <div className="text-sm text-white/90 ml-6">
                          <p><span className="font-semibold">Order #:</span> {selectedTicket.orderId.orderNumber}</p>
                          <p><span className="font-semibold">Service:</span> {selectedTicket.orderId.service}</p>
                          <p><span className="font-semibold">Amount:</span> ${selectedTicket.orderId.amount?.toFixed(2) || '0.00'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/70">
                      Created: {new Date(selectedTicket.createdAt).toLocaleString()}
                    </p>
                    {selectedTicket.assignedTo && (
                      <p className="text-sm text-yellow-400 mt-1">
                        Assigned to: {selectedTicket.assignedTo?.name || 'Admin'}
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
                        <span className="text-xs text-white/70 font-medium">You</span>
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
                            {reply.isAdmin ? 'Admin' : 'You'}
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

                  {/* Legacy Admin Response (backward compatibility) */}
                  {selectedTicket.adminResponse && (!selectedTicket.replies || selectedTicket.replies.length === 0) && (
                    <div className="flex justify-start">
                      <div className="max-w-2xl">
                        <div className="flex items-end space-x-2 mb-1">
                          <Shield className="w-4 h-4 text-white/70" />
                          <span className="text-xs text-white/70 font-medium">Admin</span>
                          <span className="text-xs text-white/50">
                            {new Date(selectedTicket.updatedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="backdrop-blur-sm bg-white/20 rounded-2xl rounded-bl-none px-4 py-3 border border-white/30">
                          <p className="text-white whitespace-pre-wrap">{selectedTicket.adminResponse}</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                      This ticket is closed. If you need further assistance, please create a new ticket.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}
