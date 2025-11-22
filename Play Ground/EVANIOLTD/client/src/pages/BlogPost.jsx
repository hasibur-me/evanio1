import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { Card } from '../components/ui/Card';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Tag, Heart, ArrowLeft, User } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/blog/${slug}`);
      setPost(response.data);
      
      // Fetch related posts
      if (response.data.category) {
        const relatedResponse = await api.get('/blog', { 
          params: { category: response.data.category, limit: 3 } 
        });
        setRelatedPosts(relatedResponse.data.posts?.filter(p => p.slug !== slug) || []);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    try {
      await api.post(`/blog/${slug}/like`);
      fetchPost();
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

  if (!post) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Card glass className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-blue-400 hover:text-blue-300">
              Back to Blog
            </Link>
          </Card>
        </div>
        <Footer />
      </GlassBackground>
    );
  }

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />
            )}

            <div className="flex items-center gap-4 mb-6 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{post.category}</span>
              </div>
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

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

            {post.excerpt && (
              <p className="text-xl text-white/80 mb-8">{post.excerpt}</p>
            )}

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/20">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white/70" />
                <div>
                  <p className="text-white font-medium">{post.author?.name || 'Admin'}</p>
                  <p className="text-white/60 text-sm">{post.author?.email || ''}</p>
                </div>
              </div>
              {user && (
                <button
                  onClick={handleLike}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Heart className={`w-5 h-5 ${
                    post.likedBy?.some(id => id === user._id) ? 'fill-red-400 text-red-400' : 'text-white/70'
                  }`} />
                  <span className="text-white">{post.likes || 0}</span>
                </button>
              )}
            </div>

            <div
              className="prose prose-invert max-w-none text-white/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost._id}
                      to={`/blog/${relatedPost.slug}`}
                      className="block"
                    >
                      <Card glass className="p-4 hover:bg-white/10 transition-colors">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {relatedPost.excerpt || relatedPost.content.substring(0, 100) + '...'}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}

