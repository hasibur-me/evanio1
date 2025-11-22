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
  Webhook,
  Plus,
  Trash2,
  Edit,
  Play,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function AdminWebhooks() {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: []
  });
  const [events, setEvents] = useState([]);

  const availableEvents = [
    'order.created',
    'order.updated',
    'order.completed',
    'order.cancelled',
    'payment.completed',
    'payment.failed',
    'user.created',
    'user.updated',
    'ticket.created',
    'ticket.updated',
    'ticket.resolved',
    'document.uploaded',
    'appointment.created',
    'appointment.cancelled'
  ];

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const response = await api.get('/webhooks/all');
      setWebhooks(response.data);
    } catch (error) {
      console.error('Error fetching webhooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/webhooks', formData);
      setShowCreateModal(false);
      setFormData({ name: '', url: '', events: [] });
      fetchWebhooks();
    } catch (error) {
      console.error('Error creating webhook:', error);
      alert(error.response?.data?.message || 'Error creating webhook');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this webhook?')) return;
    
    try {
      await api.delete(`/webhooks/${id}`);
      fetchWebhooks();
    } catch (error) {
      console.error('Error deleting webhook:', error);
      alert(error.response?.data?.message || 'Error deleting webhook');
    }
  };

  const handleTest = async (id) => {
    try {
      const response = await api.post(`/webhooks/${id}/test`);
      alert(`Test webhook sent: ${response.data.message}`);
    } catch (error) {
      console.error('Error testing webhook:', error);
      alert(error.response?.data?.message || 'Error testing webhook');
    }
  };

  const toggleEvent = (event) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }));
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Webhooks</h1>
              <p className="text-white/80 mt-2">Manage webhook integrations</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Webhook
            </Button>
          </div>

          {webhooks.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <Webhook className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80 mb-4">No webhooks configured</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create Your First Webhook
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <Card glass key={webhook._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Webhook className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">{webhook.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          webhook.isActive
                            ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                            : 'bg-gray-500/30 text-gray-200 border border-gray-400/50'
                        }`}>
                          {webhook.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-mono">{webhook.url}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Events:</span>{' '}
                          {webhook.events?.length > 0 ? (
                            <span className="text-white/70">
                              {webhook.events.join(', ')}
                            </span>
                          ) : (
                            <span className="text-white/50">No events selected</span>
                          )}
                        </div>
                        {webhook.stats && (
                          <div className="flex gap-4 text-xs text-white/60">
                            <span>Total: {webhook.stats.totalRequests || 0}</span>
                            <span className="text-green-400">Success: {webhook.stats.successfulRequests || 0}</span>
                            <span className="text-red-400">Failed: {webhook.stats.failedRequests || 0}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleTest(webhook._id)}
                        className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Test
                      </Button>
                      <Button
                        onClick={() => setSelectedWebhook(selectedWebhook === webhook._id ? null : webhook._id)}
                        className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </Button>
                      <Button
                        onClick={() => handleDelete(webhook._id)}
                        className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedWebhook === webhook._id && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-white mb-2">Webhook Secret:</p>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 p-2 bg-white/5 rounded text-white/80 font-mono text-sm">
                              {webhook.secret || 'N/A'}
                            </code>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(webhook.secret);
                                alert('Secret copied!');
                              }}
                              className="p-2 hover:bg-white/10 rounded"
                            >
                              <Copy className="w-4 h-4 text-white/70" />
                            </button>
                          </div>
                        </div>
                        {webhook.events && webhook.events.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-white mb-2">Recent Events:</p>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {webhook.events.slice(0, 10).map((event, idx) => (
                                <div key={idx} className="p-2 bg-white/5 rounded text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="text-white/80">{event.event}</span>
                                    <span className={`px-2 py-1 rounded ${
                                      event.status === 'success'
                                        ? 'bg-green-500/30 text-green-200'
                                        : event.status === 'failed'
                                        ? 'bg-red-500/30 text-red-200'
                                        : 'bg-yellow-500/30 text-yellow-200'
                                    }`}>
                                      {event.status}
                                    </span>
                                  </div>
                                  {event.error && (
                                    <p className="text-red-300 text-xs mt-1">{event.error}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Create Webhook Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Create Webhook</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Name *</label>
                    <Input
                      glass
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="My Webhook"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Webhook URL *</label>
                    <Input
                      glass
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://your-server.com/webhook"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Events *</label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-3 bg-white/5 rounded-lg">
                      {availableEvents.map((event) => (
                        <label key={event} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.events.includes(event)}
                            onChange={() => toggleEvent(event)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-white/80 text-sm">{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={!formData.name || !formData.url || formData.events.length === 0}
                      className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Create Webhook
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

