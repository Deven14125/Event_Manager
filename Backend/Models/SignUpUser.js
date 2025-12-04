const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add your first name'],
        trim: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name'],
        trim: true,
        minlength: 2
    },
    dob: {
        type: Date,
        required: [true, 'Please add your date of birth']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    mobile: {
        type: String,
        required: [true, 'Please add a mobile number'],
        unique: true,
        match: [
            /^[0-9]{10}$/,
            'Please add a valid 10-digit mobile number'
        ]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('userSignup', userSchema);
