import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { GlassBackground } from '../../components/GlassBackground';
import api from '../../utils/api';
import {
  FileText,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Calendar
} from 'lucide-react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices/my-invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInvoice = async (orderId) => {
    try {
      await api.post('/invoices/generate', { orderId });
      fetchInvoices();
      alert('Invoice generated successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert(error.response?.data?.message || 'Error generating invoice');
    }
  };

  const handleDownloadInvoice = (invoice) => {
    if (invoice.pdfUrl) {
      window.open(`${process.env.VITE_API_URL || 'http://localhost:5000'}${invoice.pdfUrl}`, '_blank');
    } else {
      alert('PDF not available. Please contact support.');
    }
  };

  const handleSendInvoice = async (invoiceId) => {
    try {
      await api.post(`/invoices/${invoiceId}/send`);
      alert('Invoice sent successfully!');
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert(error.response?.data?.message || 'Error sending invoice');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/30 text-green-200 border-green-400/50';
      case 'sent':
        return 'bg-blue-500/30 text-blue-200 border-blue-400/50';
      case 'overdue':
        return 'bg-red-500/30 text-red-200 border-red-400/50';
      case 'draft':
        return 'bg-gray-500/30 text-gray-200 border-gray-400/50';
      default:
        return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50';
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

  return (
    <GlassBackground>
      <Header />
        <div className="flex min-h-screen pt-16 md:pt-20">
        <Sidebar />
        <div className="flex-1 ml-64 p-8 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Invoices</h1>
            <p className="text-white/80 mt-2">View and download your invoices</p>
          </div>

          {invoices.length === 0 ? (
            <Card glass>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/80 mb-4">No invoices yet</p>
                <p className="text-white/60 text-sm">Invoices will be generated automatically when you place orders</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card glass key={invoice._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">
                          Invoice #{invoice.invoiceNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border capitalize ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                          {invoice.dueDate && (
                            <>
                              <span className="text-white/50">•</span>
                              <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        {invoice.orderId && (
                          <div className="flex items-center gap-2">
                            <span>Order: {invoice.orderId.orderNumber || 'N/A'}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-lg font-semibold text-white">
                            Total: ${invoice.total.toFixed(2)} {invoice.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {invoice.pdfUrl && (
                        <Button
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      )}
                      <Button
                        onClick={() => handleSendInvoice(invoice._id)}
                        className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Send
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

