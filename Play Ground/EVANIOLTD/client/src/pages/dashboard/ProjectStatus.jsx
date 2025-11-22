import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { GlassBackground } from '../../components/GlassBackground';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/ui/Button';
import api from '../../utils/api';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Calendar,
  Users,
  Target,
  TrendingUp,
  RefreshCw,
  Send,
  Paperclip,
  X,
  Eye,
  File,
  Image as ImageIcon,
  Video,
  FileCode
} from 'lucide-react';

export default function ProjectStatus() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProjects();
      
      if (autoRefresh) {
        const interval = setInterval(() => {
          fetchProjects(true);
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
      }
    }
  }, [user, autoRefresh]);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectDetails(selectedProject._id);
    }
  }, [selectedProject]);

  const fetchProjects = async (silent = false) => {
    if (!user) return;
    
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const ordersRes = await api.get('/orders/my-orders');
      setProjects(ordersRes.data);
      
      if (!selectedProject && ordersRes.data.length > 0) {
        setSelectedProject(ordersRes.data[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const [filesRes, milestonesRes, messagesRes] = await Promise.all([
        api.get(`/orders/${projectId}/files`).catch(() => ({ data: [] })),
        api.get(`/orders/${projectId}/milestones`).catch(() => ({ data: [] })),
        api.get(`/orders/${projectId}/messages`).catch(() => ({ data: [] })),
      ]);

      setFiles(filesRes.data || []);
      setMilestones(milestonesRes.data || []);
      setMessages(messagesRes.data || []);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedProject) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('orderId', selectedProject._id);

    try {
      const response = await api.post('/orders/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFiles([...files, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProject) return;

    try {
      const response = await api.post('/orders/messages', {
        orderId: selectedProject._id,
        message: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-400/50 text-green-300';
      case 'in-progress':
        return 'bg-blue-500/20 border-blue-400/50 text-blue-300';
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300';
      case 'cancelled':
        return 'bg-red-500/20 border-red-400/50 text-red-300';
      default:
        return 'bg-gray-500/20 border-gray-400/50 text-gray-300';
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return ImageIcon;
    if (['mp4', 'avi', 'mov', 'webm'].includes(ext)) return Video;
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css'].includes(ext)) return FileCode;
    return File;
  };

  const calculateProgress = () => {
    if (!milestones.length) return 0;
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Project Status</h1>
              <p className="text-white/80 mt-2">Track your projects in real-time</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                Auto-refresh
              </label>
              <Button
                onClick={() => fetchProjects(true)}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects List */}
            <div className="lg:col-span-1">
              <GlassCard variant="default" className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">My Projects</h2>
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedProject?._id === project._id
                          ? 'bg-blue-500/20 border-blue-400/50'
                          : 'bg-white/5 border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm">{project.serviceName}</h3>
                        {getStatusIcon(project.status)}
                      </div>
                      <p className="text-white/70 text-xs mb-2">{project.packageName}</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Project Details */}
            {selectedProject ? (
              <div className="lg:col-span-2 space-y-6">
                {/* Project Header */}
                <GlassCard variant="default" className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.serviceName}</h2>
                      <p className="text-white/70">{selectedProject.packageName}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70 text-sm">Overall Progress</span>
                      <span className="text-white font-semibold">{calculateProgress()}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>

                {/* Milestones Timeline */}
                <GlassCard variant="default" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Milestones
                    </h3>
                    <span className="text-white/70 text-sm">
                      {milestones.filter(m => m.status === 'completed').length} / {milestones.length} completed
                    </span>
                  </div>
                  <div className="space-y-4">
                    {milestones.length > 0 ? (
                      milestones.map((milestone, index) => (
                        <div key={milestone._id || index} className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.status === 'completed'
                              ? 'bg-green-500/20 border-2 border-green-400'
                              : milestone.status === 'in-progress'
                              ? 'bg-blue-500/20 border-2 border-blue-400'
                              : 'bg-white/10 border-2 border-white/20'
                          }`}>
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : milestone.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-blue-400" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-white/40" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-white">{milestone.title}</h4>
                              {milestone.dueDate && (
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(milestone.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 text-sm mb-2">{milestone.description}</p>
                            {milestone.status === 'in-progress' && (
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${milestone.progress || 0}%` }} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/70 text-center py-8">No milestones yet</p>
                    )}
                  </div>
                </GlassCard>

                {/* Files Section */}
                <GlassCard variant="default" className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      Files & Documents
                    </h3>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {files.map((file, index) => {
                      const FileIcon = getFileIcon(file.name);
                      return (
                        <div
                          key={file._id || index}
                          className="p-4 bg-white/5 border border-white/20 rounded-lg hover:border-white/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <FileIcon className="w-8 h-8 text-blue-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{file.name}</p>
                              <p className="text-white/60 text-xs">
                                {file.size ? `${(file.size / 1024).toFixed(1)} KB` : ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={file.url}
                              download
                              className="flex-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded text-white text-xs text-center transition-colors"
                            >
                              <Download className="w-3 h-3 inline mr-1" />
                              Download
                            </a>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-xs transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                    {files.length === 0 && (
                      <p className="col-span-full text-white/70 text-center py-8">No files uploaded yet</p>
                    )}
                  </div>
                </GlassCard>

                {/* Messages Section */}
                <GlassCard variant="default" className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    Messages & Communication
                  </h3>
                  <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                    {messages.map((message, index) => (
                      <div
                        key={message._id || index}
                        className={`p-3 rounded-lg ${
                          message.sender === user?._id
                            ? 'bg-blue-500/20 ml-auto max-w-[80%]'
                            : 'bg-white/5 mr-auto max-w-[80%]'
                        }`}
                      >
                        <p className="text-white text-sm">{message.message}</p>
                        <p className="text-white/60 text-xs mt-1">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <p className="text-white/70 text-center py-8">No messages yet</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </GlassCard>
              </div>
            ) : (
              <div className="lg:col-span-2">
                <GlassCard variant="default" className="p-12 text-center">
                  <p className="text-white/70">Select a project to view details</p>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}

