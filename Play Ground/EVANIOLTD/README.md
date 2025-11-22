# Evanio - Complete MERN Stack Application

A production-ready full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, document management, ticket system, payments, and admin dashboard.

## 🚀 Features

### Public Website
- Modern homepage with hero section and services grid
- Responsive design with TailwindCSS
- Call-to-action sections
- Clean footer layout
- Glassmorphism UI design

### User Dashboard
- Dashboard overview with stats cards
- View and download documents
- Create and manage support tickets
- Payment history with Stripe integration
- Profile settings
- Notifications system

### Admin Dashboard
- User management (view, edit, delete, change roles)
- Upload documents to users
- Respond to support tickets
- View all orders and payments
- Analytics dashboard with charts (Recharts)
- Revenue tracking
- **Theme Settings**: Customize logo, colors, images, prices, header, and more

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls
- Lucide Icons
- Recharts for analytics

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Stripe for payments
- Resend for emails
- UploadThing for file uploads

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Stripe account
- Resend account
- UploadThing account

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
RESEND_API_KEY=re_your_resend_api_key
```

4. Create an admin user:
```bash
npm run create-admin
```
**Note:** Edit `server/scripts/createAdmin.js` first to set your admin email and password!

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
VITE_UPLOADTHING_TOKEN=your_uploadthing_token
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🗂️ Project Structure

```
EVANIOLTD/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Input.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Homepage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Documents.jsx
│   │   │   │   ├── Tickets.jsx
│   │   │   │   ├── Payments.jsx
│   │   │   │   └── Profile.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminUsers.jsx
│   │   │       ├── AdminDocuments.jsx
│   │   │       ├── AdminTickets.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       └── AdminAnalytics.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── cn.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── ticketController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   ├── Ticket.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── email.js
│   │   └── generateToken.js
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Documents
- `GET /api/documents` - Get user documents (protected)
- `POST /api/documents` - Upload document (admin only)
- `DELETE /api/documents/:id` - Delete document (protected)

### Tickets
- `GET /api/tickets` - Get tickets (protected)
- `POST /api/tickets` - Create ticket (protected)
- `PUT /api/tickets/:id/reply` - Reply to ticket (admin only)

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout (protected)
- `GET /api/payments/success` - Payment success callback
- `GET /api/payments` - Get payments (protected)
- `POST /api/payments/webhook` - Stripe webhook handler

### Users (Admin)
- `GET /api/users/stats` - Get dashboard stats (admin only)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/profile/update` - Update profile (protected)
- `PUT /api/users/notifications/read` - Mark notification as read (protected)

## 🔑 Default Admin Account

To create an admin account, you can:
1. Register a normal user
2. Change the role in MongoDB to "admin"
3. Or modify the registration logic to create an admin account

## 📧 Email Notifications

The application sends emails for:
- User welcome email
- Payment success confirmation
- Document upload notifications
- Ticket response notifications

## 💳 Stripe Integration

1. Create a Stripe account
2. Get your API keys from Stripe Dashboard
3. Set up webhook endpoint for payment confirmation
4. Add webhook secret to environment variables

## 📄 UploadThing Integration

1. Create an UploadThing account
2. Get your API keys
3. Configure UploadThing in your application
4. Use the upload URL in document uploads

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

The `vercel.json` file is configured for serverless deployment.

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- MongoDB Atlas connection string
- JWT Secret
- Stripe keys
- Resend API key
- UploadThing keys
- Frontend URL

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Development

For development, run both servers concurrently:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!


