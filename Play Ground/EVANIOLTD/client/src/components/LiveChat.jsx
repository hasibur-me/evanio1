import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Mail, Phone } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const FAQ_RESPONSES = {
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! What can I assist you with?',
  'help': 'I\'m here to help! You can ask me about our services, pricing, or any questions you have.',
  'services': 'We offer Business Formation, Website Development, Logo & Branding, Payment Gateway Setup, and more. Would you like to know more about any specific service?',
  'pricing': 'Our pricing varies by service. You can view detailed pricing on each service page. Would you like me to direct you to a specific service?',
  'contact': 'You can reach us at hello@evanio.com or call +880 1800 000 800. We\'re here to help!',
  'hours': 'We\'re available Monday-Friday, 9 AM - 6 PM. You can also reach us via email anytime!',
};

export const LiveChat = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const messagesEndRef = useRef(null);
  const chatHistoryRef = useRef([]);
  const welcomeMessageAdded = useRef(false);

  useEffect(() => {
    loadChatHistory();
    checkOnlineStatus();
  }, []);

  // Add welcome message only once when component mounts
  useEffect(() => {
    if (!welcomeMessageAdded.current) {
      welcomeMessageAdded.current = true;
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        text: 'Hello! 👋 Welcome to Evanio. How can I help you today?',
        timestamp: new Date(),
      }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    if (user) {
      try {
        const response = await api.get('/tickets');
        // Load recent tickets as chat history
        // This is a simplified version - in production, you'd have a dedicated chat endpoint
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  };

  const checkOnlineStatus = () => {
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, text, timestamp = new Date()) => {
    const message = {
      id: Date.now(),
      sender,
      text,
      timestamp,
    };
    setMessages((prev) => [...prev, message]);
    chatHistoryRef.current.push(message);
    return message;
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for FAQ matches
    for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    // For any other message, show form instead of default response
    return null; // Return null to trigger form display
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || !isOnline) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage('user', userMessage);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(userMessage);
      
      // If botResponse is null (not a FAQ match), show form instead
      if (botResponse === null) {
        setShowForm(true);
        setFormSubmitted(false); // Reset form submitted state for new conversation
        addMessage('bot', 'I\'d love to help you! Please fill out the form below so we can get in touch with you.');
      } else if (botResponse) {
        // FAQ response - don't show form
        addMessage('bot', botResponse);
        setShowForm(false);
      }

      // If user is logged in, create a support ticket
      if (user && botResponse) {
        createSupportTicket(userMessage, botResponse);
      }
    }, 1000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      return;
    }

    setIsTyping(true);

    try {
      // Submit form data to backend
      const response = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        subject: 'Chat Inquiry',
        message: 'User submitted contact form via chat',
        service: 'General Inquiry',
        source: 'chat',
      });

      console.log('Contact form submitted successfully:', response.data);

      // Track in analytics
      if (window.analytics) {
        window.analytics.trackEvent('chat_form_submission', {
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          contactId: response.data.contactId,
        });
      }

      // Show thank you message
      setFormSubmitted(true);
      setShowForm(false);
      addMessage('bot', 'Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to browse our services or check out our FAQ page.');
      
      // Reset form
      setFormData({ name: '', email: '', whatsapp: '' });
      
      // Reset formSubmitted after a delay to allow new conversations
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Error details:', error.response?.data || error.message);
      addMessage('bot', 'Sorry, there was an error submitting your information. Please try again or contact us directly.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createSupportTicket = async (message, botResponse) => {
    try {
      await api.post('/tickets', {
        subject: 'Chat Inquiry',
        message: `Chat Message: ${message}\n\nBot Response: ${botResponse}`,
        priority: 'normal',
      });
    } catch (error) {
      console.error('Error creating support ticket:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all z-[9999]"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        {!isOnline && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] z-[9999] transition-all ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      <GlassCard className="h-full flex flex-col border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <div>
              <h3 className="font-bold text-white">Live Chat Support</h3>
              <p className="text-xs text-white/70">
                {isOnline ? 'Online' : 'Offline'} • {user ? user.name : 'Guest'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/90'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              {showForm && !formSubmitted && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 max-w-[85%]">
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Name *</label>
                        <div className="relative">
                          <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormInputChange}
                            required
                            placeholder="Your name"
                            className="w-full pl-8 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormInputChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full pl-8 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">WhatsApp *</label>
                        <div className="relative">
                          <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleFormInputChange}
                            required
                            placeholder="+1 234 567 8900"
                            className="w-full pl-8 pr-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isTyping}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isTyping ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!showForm && (
              <div className="p-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isOnline ? "Type your message..." : "Currently offline"}
                    disabled={!isOnline}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputMessage.trim() || !isOnline}
                    className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {!isOnline && (
                  <p className="text-xs text-red-400 mt-2">You're currently offline. Please check your connection.</p>
                )}
              </div>
            )}
          </>
        )}
      </GlassCard>
    </div>
  );
};

