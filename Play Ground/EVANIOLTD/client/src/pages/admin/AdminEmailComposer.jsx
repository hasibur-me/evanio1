import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { Mail, Send, Users, User, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function AdminEmailComposer() {
  const [mode, setMode] = useState('single'); // 'single' or 'bulk'
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [actionUrl, setActionUrl] = useState('');
  const [actionText, setActionText] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(uid => uid !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u._id));
    }
  };

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
    );
  });

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('Please fill in subject and message');
      return;
    }

    if (mode === 'single') {
      if (!userId && !email.trim()) {
        alert('Please select a user or enter an email address');
        return;
      }
    } else {
      if (selectedUserIds.length === 0 && !userRole) {
        alert('Please select users or choose a user role');
        return;
      }
    }

    setSending(true);
    setResult(null);

    try {
      if (mode === 'single') {
        const response = await api.post('/email/send', {
          userId: userId || null,
          email: email || null,
          subject,
          message,
          actionUrl: actionUrl || null,
          actionText: actionText || null
        });

        setResult({
          success: true,
          message: response.data.message,
          skipped: response.data.skipped
        });
      } else {
        const response = await api.post('/email/send-bulk', {
          userIds: selectedUserIds.length > 0 ? selectedUserIds : null,
          userRole: selectedUserIds.length === 0 ? userRole : null,
          subject,
          message,
          actionUrl: actionUrl || null,
          actionText: actionText || null
        });

        setResult({
          success: true,
          message: response.data.message,
          results: response.data.results
        });
      }

      // Reset form
      setSubject('');
      setMessage('');
      setActionUrl('');
      setActionText('');
      if (mode === 'single') {
        setUserId('');
        setEmail('');
      } else {
        setSelectedUserIds([]);
      }
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || 'Error sending email'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Email Composer</h1>
            <p className="text-white/80 mt-2">Send emails to users</p>
          </div>

          {/* Mode Toggle */}
          <Card glass className="mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setMode('single');
                  setSelectedUserIds([]);
                  setResult(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  mode === 'single'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Single User
                </div>
              </button>
              <button
                onClick={() => {
                  setMode('bulk');
                  setUserId('');
                  setEmail('');
                  setResult(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  mode === 'bulk'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Bulk Email
                </div>
              </button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recipient Selection */}
            <div className="lg:col-span-1">
              <Card glass>
                <h2 className="text-xl font-semibold text-white mb-4">
                  {mode === 'single' ? 'Select Recipient' : 'Select Recipients'}
                </h2>

                {mode === 'single' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Select User:
                      </label>
                      <select
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value);
                          const user = users.find(u => u._id === e.target.value);
                          setEmail(user?.email || '');
                        }}
                        className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Choose a user...</option>
                        {users.map(user => (
                          <option key={user._id} value={user._id} className="bg-gray-800">
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center text-white/70">OR</div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Enter Email:
                      </label>
                      <Input
                        glass
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Filter by Role:
                      </label>
                      <select
                        value={userRole}
                        onChange={(e) => {
                          setUserRole(e.target.value);
                          setSelectedUserIds([]);
                        }}
                        className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="user" className="bg-gray-800">All Users</option>
                        <option value="admin" className="bg-gray-800">Admins Only</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-white/90">
                          Select Users:
                        </label>
                        <button
                          onClick={handleSelectAll}
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          {selectedUserIds.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <Input
                        glass
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="mb-3"
                      />
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {loading ? (
                          <div className="text-center py-4">
                            <Loader className="w-6 h-6 animate-spin text-white/50 mx-auto" />
                          </div>
                        ) : filteredUsers.length === 0 ? (
                          <p className="text-white/70 text-center py-4">No users found</p>
                        ) : (
                          filteredUsers.map(user => (
                            <label
                              key={user._id}
                              className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedUserIds.includes(user._id)}
                                onChange={() => handleUserSelect(user._id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                                <p className="text-white/60 text-xs truncate">{user.email}</p>
                              </div>
                            </label>
                          ))
                        )}
                      </div>
                      {selectedUserIds.length > 0 && (
                        <p className="text-sm text-white/70 mt-2">
                          {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''} selected
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Email Composer */}
            <div className="lg:col-span-2">
              <Card glass>
                <h2 className="text-xl font-semibold text-white mb-4">Compose Email</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Subject: *
                    </label>
                    <Input
                      glass
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Message: *
                    </label>
                    <Textarea
                      glass
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message here..."
                      rows={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Action URL (Optional):
                      </label>
                      <Input
                        glass
                        type="url"
                        value={actionUrl}
                        onChange={(e) => setActionUrl(e.target.value)}
                        placeholder="https://example.com/action"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Action Button Text (Optional):
                      </label>
                      <Input
                        glass
                        type="text"
                        value={actionText}
                        onChange={(e) => setActionText(e.target.value)}
                        placeholder="Click Here"
                      />
                    </div>
                  </div>

                  {result && (
                    <div className={`p-4 rounded-lg ${
                      result.success
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-red-500/20 border border-red-500/50'
                    }`}>
                      <div className="flex items-start gap-3">
                        {result.success ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-semibold ${
                            result.success ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {result.message}
                          </p>
                          {result.skipped && (
                            <p className="text-sm text-yellow-300 mt-1">
                              Email was skipped due to user preferences
                            </p>
                          )}
                          {result.results && (
                            <div className="mt-2 text-sm text-white/80">
                              <p>Sent: {result.results.sent}</p>
                              <p>Skipped: {result.results.skipped}</p>
                              <p>Failed: {result.results.failed}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleSend}
                      disabled={sending || !subject.trim() || !message.trim()}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {sending ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Email{mode === 'bulk' && selectedUserIds.length > 0 ? ` (${selectedUserIds.length})` : ''}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}

