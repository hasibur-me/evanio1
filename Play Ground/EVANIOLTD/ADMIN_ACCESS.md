# Admin Access Guide

This guide explains how to create an admin user and access the admin dashboard.

## Method 1: Create Admin Using Script (Recommended)

### Step 1: Update Admin Credentials
Edit the file `server/scripts/createAdmin.js` and change the admin credentials:

```javascript
const adminData = {
  name: 'Admin User',
  email: 'admin@evanioltd.com', // CHANGE THIS EMAIL
  password: 'Admin@123', // CHANGE THIS PASSWORD - Use a strong password!
  role: 'admin'
};
```

### Step 2: Run the Script

From the `server` directory, run:

```bash
cd server
npm run create-admin
```

This will:
- Connect to your MongoDB database
- Check if an admin already exists
- Create a new admin user with the credentials you specified
- If a user with that email already exists, it will upgrade them to admin

### Step 3: Login

1. Go to `http://localhost:5173/login` (or your frontend URL)
2. Use the email and password you set in the script
3. After login, you'll be redirected to the admin dashboard

## Method 2: First User Auto-Admin

If no users exist in the database yet, the **first user to register** will automatically be assigned the admin role.

1. Go to `http://localhost:5173/register`
2. Register a new account
3. This account will automatically be an admin

## Method 3: Promote Existing User to Admin

### Option A: Using Admin Dashboard (If you already have admin access)

1. Login as an existing admin
2. Go to `/admin/users`
3. Find the user you want to promote
4. Change their role to "admin" using the role dropdown

### Option B: Using MongoDB Directly

1. Connect to your MongoDB database (using MongoDB Compass, Atlas UI, or mongo shell)
2. Find the user in the `users` collection
3. Update the user document:
   ```javascript
   db.users.updateOne(
     { email: "user@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Option C: Modify and Run the Create Admin Script

1. Edit `server/scripts/createAdmin.js`
2. Change the email to match an existing user's email
3. Run `npm run create-admin`
4. The script will upgrade that user to admin

## Accessing Admin Dashboard

Once you have admin access:

1. **Login** at `http://localhost:5173/login`
2. After successful login, you'll see an **"Admin"** link in the header
3. Click **"Admin"** or go directly to `http://localhost:5173/admin`
4. You'll have access to:
   - **Dashboard**: Overview of users, orders, tickets, revenue
   - **Users**: Manage all users, change roles, delete users
   - **Upload Documents**: Upload documents to any user
   - **Tickets**: View and respond to all support tickets
   - **Orders**: View all service orders and payments
   - **Analytics**: View charts and statistics
   - **Settings**: Customize theme, logo, colors, images, prices

## Admin Features

### User Management (`/admin/users`)
- View all users in a table
- Search users by name or email
- Change user roles (user/admin)
- Delete users
- View user details

### Document Management (`/admin/documents`)
- Upload documents to any user
- View all documents
- Remove documents
- Replace files

### Ticket Management (`/admin/tickets`)
- View all support tickets
- Reply to tickets
- Close tickets
- See ticket status and history

### Order Management (`/admin/orders`)
- View all service orders
- See order details (Order ID, User, Amount, Status)
- Filter and search orders

### Analytics (`/admin/analytics`)
- Revenue line chart
- Monthly signup bar chart
- Orders pie chart
- Visual statistics

### Theme Settings (`/admin/settings`)
- **Logo Settings**: Change logo text and sizes (mobile/tablet/desktop)
- **Color Settings**: Primary, secondary, accent colors, heading and body text colors
- **Header Settings**: Background and border opacity
- **Image Settings**: Hero section and About section images
- **Pricing & Currency**: Currency code and symbol
- **Site Meta**: Site title and description

## Troubleshooting

### "Not authorized as admin" Error

If you see this error:
1. Check that your user role is set to "admin" in the database
2. Logout and login again to refresh your session
3. Clear browser cache and cookies
4. Check that your JWT token is valid

### Can't Access Admin Routes

- Ensure you're logged in
- Verify your user role is "admin" (not "user")
- Check the browser console for any errors
- Verify the backend server is running

### Forgot Admin Password

If you forget your admin password and can't access the admin dashboard:

1. Use Method 3C above to create a new admin user
2. Or reset the password directly in MongoDB:
   ```javascript
   // You'll need to hash the password first using bcrypt
   // Or use the createAdmin script with a new email
   ```

## Security Notes

⚠️ **Important Security Practices:**

1. **Change Default Password**: Always change the default admin password after first login
2. **Use Strong Passwords**: Use complex passwords with uppercase, lowercase, numbers, and special characters
3. **Secure Email**: Use a secure email address for the admin account
4. **Limit Admin Users**: Only create admin accounts for trusted users
5. **Regular Audits**: Periodically review admin users and remove unnecessary ones
6. **Environment Variables**: Never commit `.env` files or admin credentials to version control

## Default Admin Credentials (Script)

⚠️ **Change these before running the script!**

- Email: `admin@evanioltd.com`
- Password: `Admin@123`

## Need Help?

If you encounter issues:
1. Check the server logs for errors
2. Verify MongoDB connection is working
3. Ensure the backend server is running on port 5000
4. Check that environment variables are set correctly
