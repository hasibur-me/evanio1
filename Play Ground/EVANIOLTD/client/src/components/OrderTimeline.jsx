import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import api from '../utils/api';
import {
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Package,
  MessageSquare,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react';

export default function OrderTimeline({ orderId, timeline: propTimeline, isAdmin = false }) {
  const [timeline, setTimeline] = useState(propTimeline || []);
  const [loading, setLoading] = useState(!propTimeline);

  useEffect(() => {
    if (propTimeline) {
      setTimeline(propTimeline);
      setLoading(false);
    } else if (orderId) {
      fetchTimeline();
    }
  }, [orderId, propTimeline]);

  const fetchTimeline = async () => {
    try {
      const response = await api.get(`/orders/${orderId}/timeline`);
      setTimeline(response.data || []);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (event) => {
    switch (event) {
      case 'created':
        return <Package className="w-5 h-5 text-blue-400" />;
      case 'status_changed':
        return <AlertCircle className="w-5 h-5 text-purple-400" />;
      case 'payment_received':
        return <CreditCard className="w-5 h-5 text-green-400" />;
      case 'payment_failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'step_completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'step_started':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'note_added':
        return <MessageSquare className="w-5 h-5 text-yellow-400" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEventColor = (event) => {
    switch (event) {
      case 'created':
        return 'bg-blue-500/30 border-blue-400/50';
      case 'status_changed':
        return 'bg-purple-500/30 border-purple-400/50';
      case 'payment_received':
        return 'bg-green-500/30 border-green-400/50';
      case 'payment_failed':
        return 'bg-red-500/30 border-red-400/50';
      case 'step_completed':
        return 'bg-green-500/30 border-green-400/50';
      case 'step_started':
        return 'bg-blue-500/30 border-blue-400/50';
      case 'note_added':
        return 'bg-yellow-500/30 border-yellow-400/50';
      case 'completed':
        return 'bg-green-500/30 border-green-400/50';
      case 'cancelled':
        return 'bg-red-500/30 border-red-400/50';
      default:
        return 'bg-gray-500/30 border-gray-400/50';
    }
  };

  if (loading) {
    return (
      <Card glass>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white/70 mt-4">Loading timeline...</p>
        </div>
      </Card>
    );
  }

  if (timeline.length === 0) {
    return (
      <Card glass>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-white/50 mx-auto mb-4" />
          <p className="text-white/80">No timeline events yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card glass>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Order Timeline</h3>
        <p className="text-white/70 text-sm">Complete history of your order</p>
      </div>

      <div className="space-y-4">
        {timeline.map((event, index) => {
          const isLast = index === timeline.length - 1;
          const changedBy = event.changedBy;
          const changedByName = changedBy?.name || 'System';
          const changedByEmail = changedBy?.email || '';

          return (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                {/* Timeline Icon & Connector */}
                <div className="flex flex-col items-center">
                  <div className={`p-3 rounded-full backdrop-blur-sm border-2 ${getEventColor(event.event)}`}>
                    {getEventIcon(event.event)}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 h-16 mt-2 bg-white/20" />
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 pb-8 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="text-sm text-white/80 mb-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-white/60 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(event.timestamp || event.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {changedBy && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{changedByName}</span>
                          </div>
                        )}
                      </div>
                      {event.metadata && Object.keys(event.metadata).length > 0 && isAdmin && (
                        <div className="mt-2 p-2 bg-white/5 rounded text-xs text-white/60 font-mono">
                          {JSON.stringify(event.metadata, null, 2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

