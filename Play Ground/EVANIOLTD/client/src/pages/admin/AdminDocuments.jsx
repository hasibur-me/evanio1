import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { Upload, FileText, User, Trash2, Download } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AdminDocuments() {
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchDocuments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents/admin/all');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await api.delete(`/documents/${id}`);
      setDocuments(documents.filter(doc => doc._id !== id));
      alert('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !title || !fileUrl) {
      alert('Please fill all fields');
      return;
    }

    setUploading(true);
    try {
      await api.post('/documents', {
        userId: selectedUserId,
        title,
        fileUrl,
      });
      alert('Document uploaded successfully');
      setSelectedUserId('');
      setTitle('');
      setFileUrl('');
      // Refresh documents list
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      alert(error.response?.data?.message || 'Error uploading document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Upload Documents</h1>
            <p className="text-white/80 mt-2">Upload documents for users</p>
          </div>

          <Card glass>
            <h2 className="text-xl font-semibold mb-4 text-white">Upload New Document</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Select User
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  required
                >
                  <option value="" className="bg-gray-800">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id} className="bg-gray-800">
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Document Title
                </label>
                <Input
                  glass
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  File URL
                </label>
                <Input
                  glass
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                  placeholder="Enter file URL (UploadThing URL)"
                />
                <p className="text-sm text-white/70 mt-1">
                  Note: Upload files using UploadThing and paste the URL here
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={uploading}
                className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </form>
          </Card>

          {/* Documents List */}
          <Card glass className="mt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Document Records</h2>
              <p className="text-white/70 mt-2">All documents sent by admins to users</p>
            </div>

            {loadingDocuments ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">No documents have been uploaded yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold text-white">Document Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Sent To (User)</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Sent By (Admin)</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, index) => (
                      <tr
                        key={doc._id}
                        className={cn(
                          'border-b border-white/10 hover:bg-white/5 transition-colors',
                          index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                        )}
                      >
                        <td className="py-4 px-4 max-w-xs">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-white font-medium truncate" title={doc.title}>
                              {doc.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-white font-medium truncate" title={doc.userId?.name || 'Unknown'}>
                                {doc.userId?.name || 'Unknown User'}
                              </p>
                              <p className="text-sm text-white/60 truncate" title={doc.userId?.email || ''}>
                                {doc.userId?.email || ''}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-white font-medium truncate" title={doc.uploadedBy?.name || 'Unknown'}>
                                {doc.uploadedBy?.name || 'Unknown Admin'}
                              </p>
                              <p className="text-sm text-white/60 truncate" title={doc.uploadedBy?.email || ''}>
                                {doc.uploadedBy?.email || ''}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 rounded text-xs font-medium backdrop-blur-sm bg-white/20 border border-white/30 text-white uppercase max-w-xs truncate block" title={doc.fileType || 'Unknown'}>
                            {doc.fileType || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white/90 text-sm">
                          {formatFileSize(doc.fileSize)}
                        </td>
                        <td className="py-4 px-4 text-white/90 text-sm">
                          {new Date(doc.timestamp || doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="backdrop-blur-sm bg-blue-600/20 border-blue-400/50 text-white hover:bg-blue-600/30"
                              onClick={() => window.open(doc.fileUrl, '_blank')}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="backdrop-blur-sm bg-red-600/20 border-red-400/50 text-white hover:bg-red-600/30"
                              onClick={() => handleDelete(doc._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </GlassBackground>
  );
}


