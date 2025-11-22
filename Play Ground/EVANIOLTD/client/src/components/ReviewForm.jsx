import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Star, X } from 'lucide-react';
import api from '../utils/api';

export default function ReviewForm({ orderId, serviceName, onSuccess, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/reviews', {
        orderId,
        rating,
        title: title.trim(),
        comment: comment.trim()
      });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glass className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Write a Review</h3>
        {onCancel && (
          <button onClick={onCancel} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <p className="text-white/70 mb-4">Service: {serviceName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Rating *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-white/30'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Review Title (Optional)
          </label>
          <Input
            glass
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Your Review *
          </label>
          <Textarea
            glass
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this service..."
            rows={5}
            required
            maxLength={1000}
          />
          <p className="text-xs text-white/60 mt-1">{comment.length}/1000 characters</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={loading || rating === 0 || !comment.trim()}
            className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

