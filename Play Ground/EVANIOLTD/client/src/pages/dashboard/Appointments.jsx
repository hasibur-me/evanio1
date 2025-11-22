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
  Calendar,
  Clock,
  MapPin,
  Video,
  Phone,
  User,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    startTime: '',
    endTime: '',
    duration: 60,
    location: {
      type: 'online',
      meetingLink: '',
      phoneNumber: '',
      address: ''
    }
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        service: '',
        startTime: '',
        endTime: '',
        duration: 60,
        location: {
          type: 'online',
          meetingLink: '',
          phoneNumber: '',
          address: ''
        }
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert(error.response?.data?.message || 'Error creating appointment');
    }
  };

  const handleCancelAppointment = async (id, reason) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await api.post(`/appointments/${id}/cancel`, { reason });
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert(error.response?.data?.message || 'Error cancelling appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/30 text-blue-200 border-blue-400/50';
      case 'confirmed':
        return 'bg-green-500/30 text-green-200 border-green-400/50';
      case 'in-progress':
        return 'bg-purple-500/30 text-purple-200 border-purple-400/50';
      case 'completed':
        return 'bg-gray-500/30 text-gray-200 border-gray-400/50';
      case 'cancelled':
        return 'bg-red-500/30 text-red-200 border-red-400/50';
      default:
        return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50';
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'online':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'in-person':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex min-h-[calc(100vh-200px)]">
          <Sidebar />
          <div className="flex-1 ml-64 p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </GlassBackground>
    );
  }

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.startTime) >= new Date() && apt.status !== 'cancelled'
  ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.startTime) < new Date() || apt.status === 'cancelled'
  ).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <GlassBackground>
      <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Appointments</h1>
              <p className="text-white/80 mt-2">Schedule and manage your appointments</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Schedule Appointment
            </Button>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length === 0 ? (
              <Card glass>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/80 mb-4">No upcoming appointments</p>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Schedule Your First Appointment
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card glass key={appointment._id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-blue-400" />
                          <h3 className="text-xl font-bold text-white">{appointment.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border capitalize ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-white/80">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(appointment.startTime).toLocaleString()} - {new Date(appointment.endTime).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getLocationIcon(appointment.location?.type)}
                            <span className="capitalize">{appointment.location?.type}</span>
                            {appointment.location?.meetingLink && (
                              <a href={appointment.location.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                Join Meeting
                              </a>
                            )}
                          </div>
                          {appointment.description && (
                            <p className="text-white/70 mt-2">{appointment.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedAppointment(selectedAppointment === appointment._id ? null : appointment._id)}
                          className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-sm"
                        >
                          {selectedAppointment === appointment._id ? 'Hide' : 'Details'}
                        </Button>
                        {appointment.status !== 'cancelled' && (
                          <Button
                            onClick={() => handleCancelAppointment(appointment._id, 'Cancelled by user')}
                            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                    {selectedAppointment === appointment._id && (
                      <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
                        {appointment.notes && appointment.notes.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-white mb-2">Notes</h4>
                            {appointment.notes.map((note, idx) => (
                              <div key={idx} className="p-3 bg-white/5 rounded-lg mb-2">
                                <p className="text-white/90 text-sm">{note.content}</p>
                                <p className="text-xs text-white/60 mt-1">
                                  {new Date(note.createdAt).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Past Appointments</h2>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card glass key={appointment._id} className="p-6 opacity-75">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{appointment.title}</h3>
                        <p className="text-sm text-white/70 mt-1">
                          {new Date(appointment.startTime).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border capitalize ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Create Appointment Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card glass className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Schedule New Appointment</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleCreateAppointment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Title *</label>
                    <Input
                      glass
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Appointment title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Description</label>
                    <Textarea
                      glass
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      placeholder="Appointment description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Start Time *</label>
                      <Input
                        glass
                        type="datetime-local"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">End Time *</label>
                      <Input
                        glass
                        type="datetime-local"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Location Type</label>
                    <select
                      value={formData.location.type}
                      onChange={(e) => setFormData({ ...formData, location: { ...formData.location, type: e.target.value } })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="online">Online</option>
                      <option value="phone">Phone</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  {formData.location.type === 'online' && (
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Meeting Link</label>
                      <Input
                        glass
                        type="url"
                        value={formData.location.meetingLink}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, meetingLink: e.target.value } })}
                        placeholder="https://meet.google.com/..."
                      />
                    </div>
                  )}
                  {formData.location.type === 'phone' && (
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                      <Input
                        glass
                        type="tel"
                        value={formData.location.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, phoneNumber: e.target.value } })}
                        placeholder="+1234567890"
                      />
                    </div>
                  )}
                  {formData.location.type === 'in-person' && (
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Address</label>
                      <Input
                        glass
                        value={formData.location.address}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })}
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                  )}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Schedule Appointment
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
    </GlassBackground>
  );
}

