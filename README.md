# Event Manager

A comprehensive full-stack Event Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to browse events, make bookings, and manage their user profiles with a modern, interactive UI.

## 🚀 Features

- **User Authentication**: Secure Login and Signup functionality.
- **Event Management**: Browse, view details, and book events.
- **User Profile**: Manage personal details and view booking history.
- **Interactive UI**: Built with React and Tailwind CSS, featuring 3D background elements using Three.js.
- **Responsive Design**: Optimized for various device sizes.

## 🛠️ Tech Stack

### Frontend
- **React**: UI Library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Three.js / React Three Fiber**: 3D Graphics
- **SweetAlert2**: Alerts and Notifications
- **React Router DOM**: Navigation

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication (implied by dependencies)

## 📂 Project Structure

```
Event_Manager/
├── Backend/                # Server-side application
│   ├── Controllers/        # Request handlers (Event, Login, Signup)
│   ├── Models/             # Mongoose schemas (Event, User)
│   ├── Routes/             # API routes definitions
│   ├── Middlewares/        # Custom middlewares
│   └── Db.js               # Database connection and Server entry point
│
└── Frontend/               # Client-side application
    ├── src/
    │   ├── Authentication/ # Login, Signup, Payment pages
    │   ├── Components/     # Reusable UI components
    │   ├── Pages/          # Main application pages
    │   ├── Services/       # API service calls
    │   └── assets/         # Static assets
    └── ...config files
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas account

### 1. Backend Setup

1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```

2.  **Note:** If a `package.json` is missing in the `Backend` folder, you may need to initialize one and install the required dependencies:
    ```bash
    npm init -y
    npm install express mongoose cors dotenv body-parser nodemon
    ```

3.  Create a `.env` file in the `Backend` directory with your database credentials:
    ```env
    MONGO_PORT=7120
    MONGO_USERNAME=your_mongodb_username
    MONGO_PASSWORD=your_mongodb_password
    ```
    *Note: The application expects the server to run on port `7120`.*

4.  Start the server:
    ```bash
    node Db.js
    # or if using nodemon
    npx nodemon Db.js
    ```
    You should see: `Connected to MongoDB Database SuccessFully` and `Server is running on port 7120`.

### 2. Frontend Setup

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 🔌 API Endpoints

The backend provides the following main API routes:

- **Auth**:
    - `POST /login/userLogin` - User login
    - `POST /user/signup` - User registration
- **Events**:
    - `GET /event/getEvent` - Get all events
    - `GET /event/getEvent/:eventName` - Get specific event
    - `POST /event/addEvent` - Create new event
    - `PATCH /event/updateEvent/:eventName` - Update event
    - `DELETE /event/deleteEvent/:eventName` - Delete event

## 📝 License

This project is licensed under the MIT License.