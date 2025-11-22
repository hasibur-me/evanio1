import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { Download, FileText, Trash2, Grid3x3, List, FileIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl, title) => {
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await api.delete(`/documents/${id}`);
      setDocuments(documents.filter(doc => doc._id !== id));
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

  const getFileIcon = (fileType) => {
    const type = fileType?.toLowerCase() || 'unknown';
    if (type.includes('pdf')) return '📄';
    if (type.includes('doc')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    return '📎';
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
              <h1 className="text-3xl font-bold text-white">Documents</h1>
              <p className="text-white/80 mt-2">View and download your documents</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('card')}
                className={cn(
                  'backdrop-blur-sm border text-white',
                  viewMode === 'card'
                    ? 'bg-white/20 border-white/40'
                    : 'bg-white/10 border-white/30 hover:bg-white/20'
                )}
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Card
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('table')}
                className={cn(
                  'backdrop-blur-sm border text-white',
                  viewMode === 'table'
                    ? 'bg-white/20 border-white/40'
                    : 'bg-white/10 border-white/30 hover:bg-white/20'
                )}
              >
                <List className="w-4 h-4 mr-2" />
                Table
              </Button>
            </div>
          </div>

          {documents.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80">No documents available</p>
              </div>
            </Card>
          ) : viewMode === 'card' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Card key={doc._id} glass className="overflow-hidden">
                  <div className="flex flex-col h-full min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="text-3xl flex-shrink-0">{getFileIcon(doc.fileType)}</div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <h3 className="font-semibold text-white text-lg mb-1 truncate" title={doc.title}>{doc.title}</h3>
                          <p className="text-sm text-white/60 truncate" title={doc.fileType || 'Unknown type'}>{doc.fileType || 'Unknown type'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">File Size:</span>
                        <span className="text-white/90 font-medium">{formatFileSize(doc.fileSize)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Uploaded:</span>
                        <span className="text-white/90 font-medium">
                          {new Date(doc.timestamp || doc.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70 flex-shrink-0 mr-2">Type:</span>
                        <span className="text-white/90 font-medium truncate ml-auto" title={doc.fileType?.toUpperCase() || 'Unknown'}>
                          {doc.fileType?.toUpperCase() || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-white/20">
                      <Button
                        variant="outline"
                        className="flex-1 backdrop-blur-sm bg-blue-600/20 border-blue-400/50 text-white hover:bg-blue-600/30"
                        onClick={() => handleDownload(doc.fileUrl, doc.title)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="danger"
                        className="backdrop-blur-sm bg-red-600/20 border-red-400/50 text-white hover:bg-red-600/30"
                        onClick={() => handleDelete(doc._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card glass>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold text-white">File</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Date Uploaded</th>
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
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="text-2xl flex-shrink-0">{getFileIcon(doc.fileType)}</div>
                            <div className="min-w-0 flex-1 overflow-hidden">
                              <p className="font-medium text-white truncate" title={doc.title}>{doc.title}</p>
                              {doc.uploadedBy?.name && (
                                <p className="text-sm text-white/60 truncate">Uploaded by {doc.uploadedBy.name}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium backdrop-blur-sm bg-white/20 border border-white/30 text-white uppercase truncate block max-w-full" 
                            title={doc.fileType || 'Unknown'}
                          >
                            {doc.fileType || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white/90">
                          {formatFileSize(doc.fileSize)}
                        </td>
                        <td className="py-4 px-4 text-white/90">
                          {new Date(doc.timestamp || doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="backdrop-blur-sm bg-blue-600/20 border-blue-400/50 text-white hover:bg-blue-600/30"
                              onClick={() => handleDownload(doc.fileUrl, doc.title)}
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
            </Card>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}
