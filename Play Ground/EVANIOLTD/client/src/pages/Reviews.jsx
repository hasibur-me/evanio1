import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { Card } from '../components/ui/Card';
import { ReviewCard } from '../components/ReviewCard';
import { TrustpilotReviews } from '../components/TrustpilotReviews';
import { Star, Filter, Search, ThumbsUp } from 'lucide-react';
import { Input } from '../components/ui/Input';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      setReviews(response.data.reviews || []);
      setFilteredReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/reviews/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!user) {
      alert('Please login to mark reviews as helpful');
      return;
    }
    try {
      const response = await api.post(`/reviews/${reviewId}/helpful`);
      // Update local state
      setReviews(prev => prev.map(r => 
        r._id === reviewId 
          ? { ...r, helpfulCount: response.data.helpfulCount }
          : r
      ));
      setFilteredReviews(prev => prev.map(r => 
        r._id === reviewId 
          ? { ...r, helpfulCount: response.data.helpfulCount }
          : r
      ));
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  useEffect(() => {
    let filtered = reviews;

    // Filter by rating
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        (review.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.comment || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [searchTerm, ratingFilter, reviews]);

  const averageRating = stats?.average || (reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0');

  const ratingDistribution = stats?.distribution || {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
        <Footer />
      </GlassBackground>
    );
  }

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Customer Reviews
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              See what our clients have to say about our services
            </p>
          </div>

          {/* Trustpilot Reviews Section */}
          <div className="mb-16">
            <TrustpilotReviews />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card glass className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-bold text-white">{averageRating}</span>
              </div>
              <p className="text-white/70">Average Rating</p>
              <p className="text-white/50 text-sm mt-1">Based on {stats?.total || reviews.length} reviews</p>
            </Card>

            <Card glass className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{stats?.total || reviews.length}</div>
              <p className="text-white/70">Total Reviews</p>
              <p className="text-white/50 text-sm mt-1">From satisfied customers</p>
            </Card>

            <Card glass className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stats?.total > 0 ? Math.round((ratingDistribution[5] / stats.total) * 100) : 0}%
              </div>
              <p className="text-white/70">5-Star Reviews</p>
              <p className="text-white/50 text-sm mt-1">Excellent ratings</p>
            </Card>
          </div>

          {/* Filters Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  glass
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          {/* Reviews Grid */}
          {filteredReviews.length === 0 ? (
            <Card glass className="p-12 text-center">
              <p className="text-white/70 text-lg">No reviews found matching your criteria.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <Card glass key={review._id} className="p-6 flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
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
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {review.userId?.name || 'Anonymous'}
                    </h3>
                    {review.serviceName && (
                      <p className="text-sm text-white/70">{review.serviceName}</p>
                    )}
                    {review.title && (
                      <p className="text-sm font-medium text-white/90 mt-1">{review.title}</p>
                    )}
                  </div>
                  <p className="text-white/90 leading-relaxed flex-grow mb-4">
                    {review.comment}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/60 pt-4 border-t border-white/20">
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    {user && (
                      <button
                        onClick={() => handleHelpful(review._id)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpfulCount || 0}</span>
                      </button>
                    )}
                  </div>
                  {review.adminResponse && (
                    <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                      <p className="text-xs text-blue-300 mb-1">Admin Response:</p>
                      <p className="text-sm text-white/90">{review.adminResponse.message}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Rating Distribution */}
          <Card glass className="mt-12 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Rating Distribution</h2>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating] || 0;
                const total = stats?.total || reviews.length;
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-white/90 font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-yellow-400 h-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-white/70 text-sm w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

