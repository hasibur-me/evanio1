import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { GlassCard } from '../components/GlassCard';
import { Card } from '../components/ui/Card';
import { Calendar, Clock, ArrowRight, Tag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Blog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await api.get('/blog', { params });
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/blog/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLike = async (slug) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    try {
      await api.post(`/blog/${slug}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
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
      <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog & Insights
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Stay informed with the latest tips, trends, and insights for growing your business.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full backdrop-blur-sm border transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600/80 border-blue-500/50 text-white'
                  : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full backdrop-blur-sm border transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600/80 border-blue-500/50 text-white'
                    : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <Card glass className="p-12 text-center">
              <p className="text-white/80 text-lg">No blog posts available yet.</p>
              <p className="text-white/60 text-sm mt-2">Check back soon for new content!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <GlassCard key={post._id} variant="service" className="p-6 md:p-8 flex flex-col">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-blue-300" />
                    <span className="text-sm text-blue-300 font-medium">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-white/80 mb-4 flex-grow">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime || 5} min read</span>
                      </div>
                      {post.views > 0 && (
                        <span>{post.views} views</span>
                      )}
                    </div>
                    {user && (
                      <button
                        onClick={() => handleLike(post.slug)}
                        className="flex items-center gap-1 hover:text-red-400 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${
                          post.likedBy?.some(id => id === user._id) ? 'fill-red-400 text-red-400' : ''
                        }`} />
                        <span>{post.likes || 0}</span>
                      </button>
                    )}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <GlassCard variant="cta" className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest articles and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 rounded-full px-8 py-3 font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

