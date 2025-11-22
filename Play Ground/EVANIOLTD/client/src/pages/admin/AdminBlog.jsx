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
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Save,
  X
} from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: 'General',
    tags: '',
    status: 'draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog/admin/all');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await api.put(`/blog/admin/${editingPost._id}`, formData);
      } else {
        await api.post('/blog', formData);
      }
      setShowEditor(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert(error.response?.data?.message || 'Error saving blog post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      category: post.category || 'General',
      tags: post.tags?.join(', ') || '',
      status: post.status,
      seo: post.seo || {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    });
    setShowEditor(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await api.delete(`/blog/admin/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert(error.response?.data?.message || 'Error deleting blog post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      category: 'General',
      tags: '',
      status: 'draft',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    });
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
              <h1 className="text-3xl font-bold text-white">Blog Management</h1>
              <p className="text-white/80 mt-2">Create and manage blog posts</p>
            </div>
            <Button
              onClick={() => {
                setEditingPost(null);
                resetForm();
                setShowEditor(true);
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>

          {/* Blog Editor Modal */}
          {showEditor && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditor(false);
                      setEditingPost(null);
                      resetForm();
                    }}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Title *</label>
                    <Input
                      glass
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Blog post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Excerpt</label>
                    <Textarea
                      glass
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      placeholder="Short description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Content *</label>
                    <Textarea
                      glass
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      required
                      placeholder="Write your blog post content here..."
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Category</label>
                      <Input
                        glass
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="General"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Tags (comma-separated)</label>
                    <Input
                      glass
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="business, startup, tips"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Featured Image URL</label>
                    <Input
                      glass
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowEditor(false);
                        setEditingPost(null);
                        resetForm();
                      }}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}

          {/* Blog Posts List */}
          {posts.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80 mb-4">No blog posts yet</p>
                <Button
                  onClick={() => {
                    setEditingPost(null);
                    resetForm();
                    setShowEditor(true);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create Your First Post
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card glass key={post._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{post.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          post.status === 'published'
                            ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                            : post.status === 'draft'
                            ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                            : 'bg-gray-500/30 text-gray-200 border border-gray-400/50'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="text-white/70 mb-3">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {post.category}
                        </div>
                        {post.views > 0 && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views} views
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

