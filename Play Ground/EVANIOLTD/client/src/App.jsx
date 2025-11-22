import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { LiveChat } from './components/LiveChat';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

// Pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import ServiceRequest from './pages/ServiceRequest';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import BusinessConsultancy from './pages/BusinessConsultancy';
import BusinessFormation from './pages/BusinessFormation';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import LogoBranding from './pages/LogoBranding';
import PaymentGatewaySetup from './pages/PaymentGatewaySetup';
import BankAccountAssistance from './pages/BankAccountAssistance';
import SocialMediaSetup from './pages/SocialMediaSetup';
import DigitalMarketing from './pages/DigitalMarketing';
import AIAutomationIntegration from './pages/AIAutomationIntegration';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import HelpCenter from './pages/HelpCenter';
import Documentation from './pages/Documentation';
import FAQ from './pages/FAQ';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Services from './pages/dashboard/Services';
import Documents from './pages/dashboard/Documents';
import Tickets from './pages/dashboard/Tickets';
import Payments from './pages/dashboard/Payments';
import Orders from './pages/dashboard/Orders';
import Profile from './pages/dashboard/Profile';
import Notifications from './pages/dashboard/Notifications';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminTickets from './pages/admin/AdminTickets';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminEmailComposer from './pages/admin/AdminEmailComposer';
import AdminAnalyticsEnhanced from './pages/admin/AdminAnalyticsEnhanced';
import AdminWebhooks from './pages/admin/AdminWebhooks';
import AdminBlog from './pages/admin/AdminBlog';
import AdminReviews from './pages/admin/AdminReviews';
import AdminContacts from './pages/admin/AdminContacts';
import Appointments from './pages/dashboard/Appointments';
import Referrals from './pages/dashboard/Referrals';
import Invoices from './pages/dashboard/Invoices';
import ProjectStatus from './pages/dashboard/ProjectStatus';

function App() {
  return (
      <DarkModeProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/service/business-consultancy" element={<BusinessConsultancy />} />
          <Route path="/service/business-formation" element={<BusinessFormation />} />
          <Route path="/service/website-development" element={<WebsiteDevelopment />} />
          <Route path="/service/logo-branding" element={<LogoBranding />} />
          <Route path="/service/payment-gateway-setup" element={<PaymentGatewaySetup />} />
          <Route path="/service/bank-account-assistance" element={<BankAccountAssistance />} />
          <Route path="/service/social-media-setup" element={<SocialMediaSetup />} />
          <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/service/ai-automation-integration" element={<AIAutomationIntegration />} />
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          
          {/* User Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/referrals"
            element={
              <ProtectedRoute>
                <Referrals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/project-status"
            element={
              <ProtectedRoute>
                <ProjectStatus />
              </ProtectedRoute>
            }
          />
          
          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/documents"
            element={
              <ProtectedRoute adminOnly>
                <AdminDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute adminOnly>
                <AdminTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute adminOnly>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics-enhanced"
            element={
              <ProtectedRoute adminOnly>
                <AdminAnalyticsEnhanced />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/webhooks"
            element={
              <ProtectedRoute adminOnly>
                <AdminWebhooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute adminOnly>
                <AdminBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute adminOnly>
                <AdminReviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute adminOnly>
                <AdminContacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute adminOnly>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/email"
            element={
              <ProtectedRoute adminOnly>
                <AdminEmailComposer />
              </ProtectedRoute>
            }
          />
        </Routes>
            <LiveChat />
            <ExitIntentPopup variant="auto" />
            <PWAInstallPrompt />
      </Router>
    </AuthProvider>
    </ThemeProvider>
    </DarkModeProvider>
  );
}

export default App;


