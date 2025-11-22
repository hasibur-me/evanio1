import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import { Users, Edit, Trash2, Shield, Search, Eye, X } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${editingUser._id}`, { name, email, role });
      setEditingUser(null);
      fetchUsers();
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  return (
    <GlassBackground>
      <Header />
      <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar isAdmin />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-white/80 mt-2">Manage all users</p>
          </div>

          {editingUser && (
            <Card glass className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Name
                  </label>
                  <Input
                    glass
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <Input
                    glass
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="user" className="bg-gray-800">User</option>
                    <option value="admin" className="bg-gray-800">Admin</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleUpdate}
                    className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90"
                  >
                    Update
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setEditingUser(null)}
                    className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            </div>
          ) : (
            <Card glass>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold text-white">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Joined</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-white/80">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                              user.role === 'admin'
                                ? 'bg-purple-500/30 text-purple-200 border-purple-400/50'
                                : 'bg-blue-500/30 text-blue-200 border-blue-400/50'
                            }`}
                          >
                            {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-white/70">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setViewingUser(user)}
                              className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(user._id)}
                              className="backdrop-blur-sm bg-red-600/20 border-red-400/50 text-white hover:bg-red-600/30"
                              title="Delete User"
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

          {viewingUser && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">User Details</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingUser(null)}
                    className="backdrop-blur-sm bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/70 mb-1">Name</p>
                    <p className="text-white font-medium">{viewingUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Email</p>
                    <p className="text-white font-medium">{viewingUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Role</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border ${
                        viewingUser.role === 'admin'
                          ? 'bg-purple-500/30 text-purple-200 border-purple-400/50'
                          : 'bg-blue-500/30 text-blue-200 border-blue-400/50'
                      }`}
                    >
                      {viewingUser.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                      {viewingUser.role}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Joined</p>
                    <p className="text-white font-medium">
                      {new Date(viewingUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Documents</p>
                    <p className="text-white font-medium">{viewingUser.documents?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Tickets</p>
                    <p className="text-white font-medium">{viewingUser.tickets?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Payments</p>
                    <p className="text-white font-medium">{viewingUser.payments?.length || 0}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}


