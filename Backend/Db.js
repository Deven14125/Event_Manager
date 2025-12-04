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

const PORT = process.env.PORT || process.env.MONGO_PORT || 7120;

app.use(express.urlencoded({ extended: true }));
app.use(BodyParser.json());

const connectionString = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@deven.bppkn.mongodb.net/Event_Management_System";

app.get('/', (req, res) => {
    res.send('Event Manager Backend is Running');
});

app.use('/login',Login);
app.use('/user',SignUp);
app.use('/event',Event);

mongoose.connect(connectionString).then(()=>{
    console.log("Connected to MongoDB Database SuccessFully");
    
    if (require.main === module) {
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
});

module.exports = app;