const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser')
const Login = require('./Routes/Login');
const SignUp = require('./Routes/Signup');
const Event = require('./Routes/Event')
const cors = require('cors');


require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.MONGO_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(BodyParser.json());

const connectionString = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@deven.bppkn.mongodb.net/Event_Management_System";

mongoose.connect(connectionString).then(()=>{
    console.log("Connected to MongoDB Database SuccessFully");
    
    app.use('/login',Login);
    app.use('/user',SignUp);
    app.use('/event',Event)
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})





// const express = require('express');
// const mongoose = require('mongoose');
// const BodyParser = require('body-parser');
// const Login = require('./Routes/Login');
// const SignUp = require('./Routes/Signup');
// const Event = require('./Routes/Event');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');  // Make sure you are using JWT for token handling

// require('dotenv').config();

// const app = express();
// app.use(cors());

// const PORT = process.env.PORT || 5000;  // Make sure the correct PORT environment variable is used

// // Middleware for body parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(BodyParser.json());

// const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@deven.bppkn.mongodb.net/Event_Management_System`;

// // JWT Authentication Middleware
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.sendStatus(403);

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("Connected to MongoDB Database successfully");

//         // Routes
//         app.use('/login', Login);
//         app.use('/user', SignUp);
//         app.use('/event', authenticateToken, Event);  // Protect event routes with token verification

//         // Start the server
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error("MongoDB connection failed:", error.message);
//     });
