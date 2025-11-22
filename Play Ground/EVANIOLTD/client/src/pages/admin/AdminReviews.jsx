import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import {
  Star,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../../components/ui/Input';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const fetchReviews = async () => {
    try {
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const response = await api.get('/reviews/admin/all', { params });
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reviewId, status) => {
    try {
      await api.patch(`/reviews/admin/${reviewId}/status`, { status });
      fetchReviews();
      alert(`Review ${status} successfully`);
    } catch (error) {
      console.error('Error updating review status:', error);
      alert(error.response?.data?.message || 'Error updating review status');
    }
  };

  const handleRespond = async (reviewId) => {
    if (!responseMessage.trim()) {
      alert('Please enter a response message');
      return;
    }

    try {
      await api.post(`/reviews/admin/${reviewId}/respond`, { message: responseMessage });
      setSelectedReview(null);
      setResponseMessage('');
      fetchReviews();
      alert('Response added successfully');
    } catch (error) {
      console.error('Error responding to review:', error);
      alert(error.response?.data?.message || 'Error responding to review');
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Review Management</h1>
              <p className="text-white/80 mt-2">Moderate and respond to customer reviews</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {reviews.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">No reviews found</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card glass key={review._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {review.userId?.name || 'Anonymous'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          review.status === 'approved'
                            ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                            : review.status === 'rejected'
                            ? 'bg-red-500/30 text-red-200 border border-red-400/50'
                            : 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                      {review.title && (
                        <p className="text-white font-medium mb-2">{review.title}</p>
                      )}
                      <p className="text-white/80 mb-3">{review.comment}</p>
                      <div className="text-sm text-white/60">
                        <p>Service: {review.serviceName}</p>
                        <p>Order: {review.orderId?.orderNumber || 'N/A'}</p>
                        <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      {review.adminResponse && (
                        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                          <p className="text-xs text-blue-300 mb-1">Admin Response:</p>
                          <p className="text-sm text-white/90">{review.adminResponse.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {review.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(review._id, 'approved')}
                            className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(review._id, 'rejected')}
                            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </Button>
                        </>
                      )}
                      {review.status === 'approved' && !review.adminResponse && (
                        <Button
                          onClick={() => setSelectedReview(selectedReview === review._id ? null : review._id)}
                          className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Respond
                        </Button>
                      )}
                    </div>
                  </div>
                  {selectedReview === review._id && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="space-y-3">
                        <Textarea
                          glass
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          placeholder="Write your response..."
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleRespond(review._id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                          >
                            Send Response
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedReview(null);
                              setResponseMessage('');
                            }}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

