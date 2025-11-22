import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, User, Shield, Clock, Trash2 } from 'lucide-react';

export default function OrderNotes({ orderId, order, onUpdate }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order && order.notes) {
      // Filter out internal notes for non-admin users
      const visibleNotes = user?.role === 'admin' 
        ? order.notes 
        : order.notes.filter(note => !note.isInternal);
      setNotes(visibleNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    }
  }, [order, user]);

  const handleSendNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSending(true);
    try {
      const response = await api.post(`/orders/${orderId}/notes`, {
        content: newNote.trim(),
        isInternal: isInternal && user?.role === 'admin'
      });

      setNewNote('');
      setIsInternal(false);
      
      if (onUpdate) {
        await onUpdate();
      } else if (response.data.notes) {
        const visibleNotes = user?.role === 'admin' 
          ? response.data.notes 
          : response.data.notes.filter(note => !note.isInternal);
        setNotes(visibleNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error sending note:', error);
      alert(error.response?.data?.message || 'Error sending note');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Card glass>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white/70 mt-4">Loading notes...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card glass>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Order Notes & Comments</h3>
        <p className="text-white/70 text-sm">
          {user?.role === 'admin' 
            ? 'Add notes or comments. Internal notes are only visible to admins.'
            : 'Add comments or questions about your order'}
        </p>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSendNote} className="mb-6 space-y-4">
        <div>
          <Textarea
            glass
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={user?.role === 'admin' 
              ? 'Add a note or comment...' 
              : 'Add a comment or question...'}
            rows={4}
            required
          />
        </div>
        {user?.role === 'admin' && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-white/80 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Internal note (only visible to admins)
            </span>
          </label>
        )}
        <Button
          type="submit"
          disabled={sending || !newNote.trim()}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {sending ? 'Sending...' : 'Send Note'}
        </Button>
      </form>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <p className="text-white/80">No notes yet. Be the first to add one!</p>
          </div>
        ) : (
          notes.map((note) => {
            const author = note.author;
            const isAdminNote = note.isAdmin;
            const isInternalNote = note.isInternal;

            return (
              <div
                key={note._id || note.createdAt}
                className={`p-4 rounded-lg border ${
                  isInternalNote
                    ? 'bg-purple-500/10 border-purple-400/30'
                    : isAdminNote
                    ? 'bg-blue-500/10 border-blue-400/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    {isAdminNote ? (
                      <Shield className="w-4 h-4 text-blue-400" />
                    ) : (
                      <User className="w-4 h-4 text-white/60" />
                    )}
                    <span className="font-semibold text-white">
                      {author?.name || 'Unknown User'}
                    </span>
                    {isAdminNote && (
                      <span className="text-xs px-2 py-0.5 bg-blue-500/30 text-blue-200 rounded">
                        Admin
                      </span>
                    )}
                    {isInternalNote && (
                      <span className="text-xs px-2 py-0.5 bg-purple-500/30 text-purple-200 rounded flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Internal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-white/90 whitespace-pre-wrap">{note.content}</p>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

