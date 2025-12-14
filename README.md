<div align="center">

# 🎉 Event Manager

### Streamline Your Events, Elevate Your Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](#) • [Report Bug](https://github.com/Deven14125/event-manager/issues) • [Request Feature](https://github.com/Deven14125/event-manager/issues)

</div>

---

## 📖 About The Project

Event Manager is a comprehensive full-stack event management system that revolutionizes how users discover, book, and manage events. Built with the powerful MERN stack (MongoDB, Express, React, Node.js), this application combines robust backend functionality with a stunning, interactive frontend featuring 3D graphics and modern UI components.

Whether you're organizing conferences, workshops, concerts, or community gatherings, Event Manager provides an intuitive platform for seamless event operations from discovery to booking.

### 🌟 Why Event Manager?

- **Complete Solution** - End-to-end event management from browsing to booking
- **Modern Architecture** - Built with industry-standard MERN stack
- **Beautiful UI** - Immersive 3D backgrounds and responsive design
- **Secure** - JWT-based authentication and secure data handling
- **Scalable** - Modular architecture ready for expansion
- **User-Friendly** - Intuitive interface designed for all user levels

---

## 📑 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure User Registration** - Create accounts with encrypted password storage
- **JWT Authentication** - Token-based secure login system
- **Session Management** - Persistent login sessions with automatic token refresh
- **Protected Routes** - Secure access to user-specific features

### 🎫 Event Management
- **Event Discovery** - Browse comprehensive event listings with detailed information
- **Advanced Search** - Find events by name, category, date, or location
- **Event Details** - View complete event information including venue, timing, and pricing
- **Real-time Availability** - Check current booking status and available slots
- **Event Booking** - Simple, secure booking process with instant confirmation

### 👤 User Profile & Dashboard
- **Personal Profile** - Manage user information and preferences
- **Booking History** - Track all past and upcoming event bookings
- **Booking Management** - View, modify, or cancel reservations
- **Personalized Experience** - Customized recommendations based on interests

### 🎨 User Interface
- **Interactive 3D Background** - Stunning Three.js animations for immersive experience
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Modern UI Components** - Clean, intuitive interface built with React
- **Smart Notifications** - SweetAlert2 integration for elegant user feedback
- **Smooth Navigation** - React Router for fluid page transitions

### 🔧 Technical Features
- **RESTful API** - Well-structured backend endpoints
- **MongoDB Integration** - Efficient data storage and retrieval
- **Error Handling** - Comprehensive error management throughout the stack
- **Performance Optimized** - Fast loading times and efficient rendering
- **Scalable Architecture** - Modular design for easy feature additions

---

## 🛠️ Tech Stack

### Frontend Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

- **React 18.x** - Modern UI library with hooks and functional components
- **Vite** - Next-generation frontend build tool for lightning-fast development
- **Tailwind CSS 3.x** - Utility-first CSS framework for rapid UI development
- **Three.js** - JavaScript 3D library for immersive graphics
- **React Three Fiber** - React renderer for Three.js
- **React Router DOM** - Declarative routing for React applications
- **SweetAlert2** - Beautiful, responsive, customizable alert dialogs
- **Axios** - Promise-based HTTP client for API requests

### Backend Technologies

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- **Node.js** - JavaScript runtime for server-side development
- **Express.js 4.x** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **bcrypt** - Password hashing for security
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Development Tools

- **Nodemon** - Auto-restart server on file changes
- **ESLint** - Code linting for maintaining quality
- **Prettier** - Code formatter for consistent styling
- **Git** - Version control

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Frontend (Vite + Tailwind + Three.js)        │  │
│  │  - Authentication Pages                              │  │
│  │  - Event Discovery & Booking                         │  │
│  │  - User Dashboard & Profile                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js Server                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │  │
│  │  │ Controllers  │  │ Middlewares  │  │  Routes   │ │  │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MongoDB Database                                    │  │
│  │  - Users Collection                                  │  │
│  │  - Events Collection                                 │  │
│  │  - Bookings Collection                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

Follow these comprehensive instructions to get Event Manager running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

#### Required Software

1. **Node.js (v16.x or higher)**
   ```bash
   # Check Node.js version
   node --version
   ```
   Download from: [https://nodejs.org/](https://nodejs.org/)

2. **npm (v8.x or higher) or yarn**
   ```bash
   # Check npm version
   npm --version
   ```

3. **MongoDB (v4.x or higher)**
   - **Local Installation**: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - **OR Cloud**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

4. **Git**
   ```bash
   git --version
   ```

### Backend Setup

#### Step 1: Clone the Repository

```bash
# Clone the project
git clone https://github.com/yourusername/event-manager.git

# Navigate to project directory
cd event-manager
```

#### Step 2: Install Backend Dependencies

```bash
# Navigate to backend directory
cd Backend

# Initialize package.json (if not present)
npm init -y

# Install required dependencies
npm install express mongoose cors dotenv body-parser nodemon jsonwebtoken bcryptjs
```

#### Step 3: Configure Environment Variables

Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=7120
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/eventmanager
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventmanager

# Alternative MongoDB Configuration (if using separate variables)
MONGO_PORT=7120
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
MONGO_DB_NAME=eventmanager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

#### Step 4: Start the Backend Server

```bash
# Using node
node Db.js

# OR using nodemon for auto-restart (recommended for development)
npx nodemon Db.js

# OR if nodemon is installed globally
nodemon Db.js
```

You should see:
```
Connected to MongoDB Database SuccessFully
Server is running on port 7120
```

### Frontend Setup

#### Step 1: Navigate to Frontend Directory

```bash
# From project root
cd Frontend
```

#### Step 2: Install Frontend Dependencies

```bash
# Install all dependencies
npm install
```

#### Step 3: Configure Frontend Environment (Optional)

Create a `.env` file in the `Frontend` directory if you need custom API URLs:

```env
VITE_API_URL=http://localhost:7120
VITE_APP_NAME=Event Manager
```

#### Step 4: Start the Development Server

```bash
# Start Vite development server
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

### Environment Variables

#### Backend `.env` Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 7120 | Yes |
| `MONGO_URI` | Complete MongoDB connection string | - | Yes |
| `MONGO_USERNAME` | MongoDB username (alternative) | - | If not using URI |
| `MONGO_PASSWORD` | MongoDB password (alternative) | - | If not using URI |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE` | Token expiration time | 7d | No |
| `NODE_ENV` | Environment mode | development | No |

#### Frontend `.env` Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | http://localhost:7120 | No |
| `VITE_APP_NAME` | Application name | Event Manager | No |

---

## 📂 Project Structure

```
Event_Manager/
│
├── Backend/                          # Server-side application
│   ├── Controllers/                  # Business logic handlers
│   │   ├── EventController.js       # Event-related operations
│   │   ├── LoginController.js       # Login authentication logic
│   │   ├── SignupController.js      # User registration logic
│   │   └── BookingController.js     # Booking management
│   │
│   ├── Models/                       # Database schemas
│   │   ├── Event.js                 # Event model schema
│   │   ├── User.js                  # User model schema
│   │   └── Booking.js               # Booking model schema
│   │
│   ├── Routes/                       # API route definitions
│   │   ├── eventRoutes.js           # Event-related routes
│   │   ├── authRoutes.js            # Authentication routes
│   │   └── bookingRoutes.js         # Booking routes
│   │
│   ├── Middlewares/                  # Custom middleware functions
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── errorHandler.js          # Global error handling
│   │   └── validation.js            # Input validation
│   │
│   ├── Utils/                        # Utility functions
│   │   ├── generateToken.js         # JWT token generation
│   │   └── sendResponse.js          # Standardized API responses
│   │
│   ├── Db.js                         # Database connection & server entry
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment template
│   ├── package.json                  # Backend dependencies
│   └── .gitignore                    # Git ignore rules
│
├── Frontend/                         # Client-side application
│   ├── public/                       # Static public assets
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── Authentication/           # Auth-related pages
│   │   │   ├── Login.jsx            # Login page component
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   └── Payment.jsx          # Payment processing page
│   │   │
│   │   ├── Components/               # Reusable UI components
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── EventCard.jsx        # Event display card
│   │   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   │   ├── Background3D.jsx     # Three.js background
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   │
│   │   ├── Pages/                    # Main application pages
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Events.jsx           # Event listing page
│   │   │   ├── EventDetails.jsx     # Single event view
│   │   │   ├── Profile.jsx          # User profile page
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   └── NotFound.jsx         # 404 page
│   │   │
│   │   ├── Services/                 # API service layer
│   │   │   ├── api.js               # Axios instance configuration
│   │   │   ├── authService.js       # Authentication API calls
│   │   │   ├── eventService.js      # Event-related API calls
│   │   │   └── bookingService.js    # Booking API calls
│   │   │
│   │   ├── Context/                  # React Context providers
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── EventContext.jsx     # Event data state
│   │   │
│   │   ├── Hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js           # Authentication hook
│   │   │   └── useEvents.js         # Event data hook
│   │   │
│   │   ├── Utils/                    # Utility functions
│   │   │   ├── validators.js        # Form validation helpers
│   │   │   └── formatters.js        # Data formatting utilities
│   │   │
│   │   ├── assets/                   # Static assets
│   │   │   ├── images/              # Image files
│   │   │   ├── icons/               # Icon files
│   │   │   └── fonts/               # Custom fonts
│   │   │
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Application entry point
│   │   └── index.css                 # Global styles & Tailwind
│   │
│   ├── .env                          # Frontend environment (not in git)
│   ├── .env.example                  # Environment template
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── package.json                  # Frontend dependencies
│   └── .gitignore                    # Git ignore rules
│
├── .gitignore                        # Root git ignore
├── README.md                         # Project documentation
└── LICENSE                           # MIT License file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:7120
```

### Authentication Endpoints

#### 1. User Registration
```http
POST /user/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. User Login
```http
POST /login/userLogin
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Event Endpoints

#### 3. Get All Events
```http
GET /event/getEvent
```

**Query Parameters:**
- `category` (optional): Filter by event category
- `limit` (optional): Number of events to return
- `page` (optional): Page number for pagination

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "eventName": "Tech Conference 2024",
      "description": "Annual technology conference",
      "date": "2024-06-15T09:00:00.000Z",
      "location": "Convention Center",
      "category": "Technology",
      "price": 299.99,
      "availableSeats": 500,
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

#### 4. Get Event by Name
```http
GET /event/getEvent/:eventName
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "eventName": "Tech Conference 2024",
    "description": "Annual technology conference featuring industry leaders...",
    "date": "2024-06-15T09:00:00.000Z",
    "location": "Convention Center, Hall A",
    "category": "Technology",
    "price": 299.99,
    "availableSeats": 500,
    "totalSeats": 1000,
    "speakers": ["Jane Smith", "Bob Johnson"],
    "imageUrl": "https://example.com/image.jpg",
    "agenda": [...],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 5. Create New Event (Admin)
```http
POST /event/addEvent
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "eventName": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-06-15T09:00:00.000Z",
  "location": "Convention Center",
  "category": "Technology",
  "price": 299.99,
  "totalSeats": 1000,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "eventName": "Tech Conference 2024",
    ...
  }
}
```

#### 6. Update Event (Admin)
```http
PATCH /event/updateEvent/:eventName
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "price": 349.99,
  "availableSeats": 450
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "eventName": "Tech Conference 2024",
    "price": 349.99,
    ...
  }
}
```

#### 7. Delete Event (Admin)
```http
DELETE /event/deleteEvent/:eventName
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid request data",
  "details": ["Email is required", "Password must be at least 8 characters"]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Authentication required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## 📱 Usage Guide

### For Users

#### 1. Getting Started
1. **Visit the Application** - Navigate to `http://localhost:5173`
2. **Create an Account** - Click "Sign Up" and fill in your details
3. **Verify Email** - Check your email for verification (if enabled)
4. **Login** - Use your credentials to access the platform

#### 2. Browsing Events
1. **Browse All Events** - View the complete event catalog on the home page
2. **Filter Events** - Use category filters to narrow down your search
3. **Search** - Use the search bar to find specific events
4. **View Details** - Click on any event card to see full information

#### 3. Booking an Event
1. **Select Event** - Choose your desired event
2. **Review Details** - Check date, time, location, and pricing
3. **Click "Book Now"** - Initiate the booking process
4. **Confirm Booking** - Review and confirm your reservation
5. **Payment** - Complete payment process (if integrated)
6. **Confirmation** - Receive booking confirmation

#### 4. Managing Your Profile
1. **Access Profile** - Click on your profile icon
2. **Update Information** - Edit personal details
3. **View Bookings** - Check your booking history
4. **Cancel Bookings** - Cancel upcoming reservations if needed

### For Developers

#### Adding New Features

**1. Adding a New API Endpoint:**

```javascript
// Backend/Routes/yourRoute.js
const express = require('express');
const router = express.Router();
const { yourController } = require('../Controllers/YourController');

router.post('/your-endpoint', yourController);

module.exports = router;
```

**2. Creating a New Component:**

```jsx
// Frontend/src/Components/YourComponent.jsx
import React from 'react';

const YourComponent = ({ prop1, prop2 }) => {
  return (
    <div className="your-tailwind-classes">
      {/* Your component content */}
    </div>
  );
};

export default YourComponent;
```

**3. Adding a New Page:**

```jsx
// Frontend/src/Pages/YourPage.jsx
import React from 'react';
import YourComponent from '../Components/YourComponent';

const YourPage = () => {
  return (
    <div className="container mx-auto">
      <YourComponent />
    </div>
  );
};

export default YourPage;

// Add to router in App.jsx
<Route path="/your-page" element={<YourPage />} />
```

---

## 🖼️ Screenshots

### Homepage
_Modern landing page with 3D background effects_
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Event Listing
_Browse all available events with filtering options_
![Event Listing](https://via.placeholder.com/800x400?text=Event+Listing+Screenshot)

### Event Details
_Comprehensive event information and booking interface_
![Event Details](https://via.placeholder.com/800x400?text=Event+Details+Screenshot)

### User Dashboard
_Personalized dashboard with booking history_
![User Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard+Screenshot)

### Login Page
_Secure authentication with modern UI_
![Login Page](https://via.placeholder.com/800x400?text=Login+Page+Screenshot)

### Profile Management
_Manage personal information and preferences_
![Profile Page](https://via.placeholder.com/800x400?text=Profile+Page+Screenshot)

> **Note:** Replace placeholder images with actual screenshots of your application

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] User authentication system
- [x] Event CRUD operations
- [x] Basic booking functionality
- [x] Responsive UI design
- [x] 3D background integration

### Phase 2: Enhancement 🚧
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications system
- [ ] Advanced search and filters
- [ ] Event categories and tags
- [ ] User reviews and ratings
- [ ] Event recommendations
- [ ] Social media sharing

### Phase 3: Advanced Features 📅
- [ ] Admin dashboard
- [ ] Event analytics and reporting
- [ ] QR code ticket generation
- [ ] Calendar integration (Google/Outlook)
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Real-time chat support
- [ ] Event reminders and notifications

### Phase 4: Optimization 🎯
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility enhancements (WCAG 2.1)
- [ ] Progressive Web App (PWA)
- [ ] Advanced caching strategies
- [ ] Load balancing
- [ ] CDN integration
- [ ] Automated testing suite

### Future Considerations 🔮
- Virtual/hybrid event support
- Live streaming integration
- Networking features
- Venue management system
- Vendor marketplace
- Sponsorship management
- Mobile check-in system

See the [open issues](https://github.com/yourusername/event-manager/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

We love contributions from the community! Whether it's bug fixes, feature enhancements, or documentation improvements, every contribution is valuable.

### How to Contribute

#### 1. Fork the Repository

Click the 'Fork' button at the top right of the repository page.

#### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/event-manager.git
cd event-manager
```

#### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-payment-integration`
- `bugfix/fix-login-error`
- `docs/update-api-documentation`

#### 4. Make Your Changes

- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly

#### 5. Commit Your Changes

```bash
git add .
git commit -m "Add: Brief description of your changes"
```

**Commit Message Guidelines:**
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Docs:` for documentation changes
- `Style:` for formatting changes
- `Refactor:` for code refactoring
- `Test:` for adding tests

#### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 7. Create a Pull Request

- Go to your fork on GitHub
- Click "New Pull Request"
- Select your feature branch
- Provide a clear description of your changes
- Link related issues
- Wait for review

### Contribution Guidelines

#### Code Style
- **JavaScript/React**: Follow Airbnb style guide
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JavaScript
- **Semicolons**: Use consistently
- **Naming**: camelCase for variables/functions, PascalCase for components

#### Pull Request Requirements
- Clear description of changes
- Link to related issues
- All tests pass
- No merge conflicts
- Updated documentation
- Screenshots for UI changes

#### What to Contribute

**Good First Issues:**
- Documentation improvements
- UI/UX enhancements
- Bug fixes
- Adding tests
- Code refactoring

**Feature Development:**
- Payment integration
- Email system
- Advanced search
- Analytics dashboard
- Mobile responsiveness

### Development Workflow

1. **Check existing issues** before starting work
2. **Discuss major changes** in an issue first
3. **Keep PRs focused** - one feature/fix per PR
4. **Write meaningful commit messages**
5. **Test thoroughly** before submitting
6. **Be responsive** to feedback and review comments

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help newcomers feel welcome
- Follow project guidelines

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Problem: Cannot connect to MongoDB**
```
Error: MongoNetworkError: failed to connect to server
```
**Solutions:**
- Check if MongoDB is running: `sudo systemctl status mongod`
- Verify connection string in `.env`
- Check firewall settings
- For MongoDB Atlas, whitelist your IP address

**Problem: Port 7120 already in use**
```
Error: listen EADDRINUSE: address already in use :::7120
```
**Solutions:**
```bash
# Find process using port 7120
lsof -i :7120

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or use a different port in .env
PORT=8000
```

**Problem: JWT token invalid or expired**
```
Error: JsonWebTokenError: invalid token
```
**Solutions:**
- Clear browser localStorage
- Check JWT_SECRET in `.env` matches
- Ensure token is being sent in Authorization header
- Verify token hasn't expired

#### Frontend Issues

**Problem: API calls failing with CORS error**
```
Access to fetch has been blocked by CORS policy
```
**Solutions:**
- Ensure CORS is enabled in backend
- Check FRONTEND_URL in backend `.env`
- Verify API URL in frontend is correct

**Problem: Vite dev server won't start**
```
Error: Cannot find module 'vite'
```
**Solutions:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Clear npm cache if issues persist
npm cache clean --force
npm install
```

**Problem: Three.js rendering issues**
```
WebGL context lost or performance issues
```
**Solutions:**
- Update graphics drivers
- Check browser WebGL support at [webglreport.com](https://webglreport.com/)
- Reduce 3D complexity or disable on low-end devices
- Enable hardware acceleration in browser settings

#### General Issues

**Problem: Environment variables not loading**
**Solutions:**
- Ensure `.env` file is in correct directory
- Restart the server after changing `.env`
- Check variable names match exactly (no typos)
- For Vite, ensure variables start with `VITE_`

**Problem: Dependencies installation fails**
**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Use legacy peer deps flag
npm install --legacy-peer-deps

# Try using yarn instead
npm install -g yarn
yarn install
```

### Getting Help

If you're still experiencing issues:

1. **Check existing issues** on GitHub
2. **Search documentation** for similar problems
3. **Create a new issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages (full stack trace)
   - Your environment (OS, Node version, etc.)
   - Screenshots if applicable

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
MIT License

Copyright (c) 2024 Event Manager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ License and copyright notice must be included
- ❌ No liability or warranty provided

---

## 📧 Contact

### Project Maintainers

**Lead Developer**: Deven Machchhar
- GitHub: [@Deven14125](https://github.com/Deven14125)
- Email: deven81281256@gmail.com
- LinkedIn: [Deven Machchhar]((https://www.linkedin.com/in/deven-machchhar-b13287286/))

### Project Links

- **Repository**: [https://github.com/Deven14125/event-manager](https://github.com/yourusername/event-manager)
- **Live Demo**: [https://event-manager.netlify.app](https://event-manager.netlify.app)
- **Documentation**: [https://docs.event-manager.com](https://docs.event-manager.com)
- **Issue Tracker**: [GitHub Issues](https://github.com/Deven14125/event-manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Deven14125/event-manager/discussions)

### Community

- **Discord Server**: [Join our community](#)
- **Twitter**: [@eventmanagerapp](https://twitter.com/eventmanagerapp)
- **Blog**: [https://blog.event-manager.com](https://blog.event-manager.com)

### Support

- **Bug Reports**: [Create an issue](https://github.com/Deven14125/event-manager/issues/new?template=bug_report.md)
- **Feature Requests**: [Create an issue](https://github.com/Deven14125/event-manager/issues/new?template=feature_request.md)
- **Questions**: [GitHub Discussions](https://github.com/Deven14125/event-manager/discussions)

---

## 🙏 Acknowledgments

Special thanks to all the amazing technologies and resources that made this project possible:

### Technologies
- [React](https://reactjs.org/) - For the amazing UI library
- [Node.js](https://nodejs.org/) - For powerful server-side JavaScript
- [MongoDB](https://www.mongodb.com/) - For flexible, scalable database
- [Express.js](https://expressjs.com/) - For robust web framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful, utility-first styling
- [Three.js](https://threejs.org/) - For stunning 3D graphics
- [Vite](https://vitejs.dev/) - For lightning-fast development experience

### Resources
- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development documentation
- [Stack Overflow](https://stackoverflow.com/) - Community support and solutions
- [GitHub](https://github.com/) - Version control and collaboration platform
- [Unsplash](https://unsplash.com/) - High-quality stock images
- [Font Awesome](https://fontawesome.com/) - Beautiful icons

### Inspiration
- Event management platforms worldwide
- Open-source community contributions
- User feedback and suggestions

### Contributors

A huge thank you to all our contributors! 🎉

[![Contributors](https://contrib.rocks/image?repo=Deven14125/event-manager)](https://github.com/Deven14125/event-manager/graphs/contributors)

Want to see your name here? [Start contributing!](#contributing)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Deven14125/event-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/Deven14125/event-manager?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Deven14125/event-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/Deven14125/event-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Deven14125/event-manager)
![GitHub last commit](https://img.shields.io/github/last-commit/Deven14125/event-manager)
![GitHub repo size](https://img.shields.io/github/repo-size/Deven14125/event-manager)

---

## 🌟 Show Your Support

If you found this project helpful or interesting, please consider:

- ⭐ **Starring the repository** - It helps others discover the project
- 🐛 **Reporting bugs** - Help us improve by reporting issues
- 💡 **Suggesting features** - Share your ideas for improvements
- 🔀 **Contributing code** - Submit pull requests
- 📢 **Spreading the word** - Share with your network
- ☕ **Buying us a coffee** - [Support on Ko-fi](#) (if applicable)

---

<div align="center">

### Made with ❤️ by the Event Manager Team

**"Streamline Your Events, Elevate Your Experience"**

[⬆ Back to Top](#-event-manager)

---

© 2024 Event Manager. All rights reserved.

</div>
