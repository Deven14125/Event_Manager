const UserSign = require('../Models/SignUpUser')
const bcrypt = require('bcrypt');

//user Sign Up Functionality

const userSignUp = async (req, res) => {
    try {
        const { firstName, lastName, dob, email, password, mobile, confirmPassword } = req.body;
        
        // Validation: Check if all required fields are provided
        if (!firstName || !lastName || !email || !password || !mobile) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields' 
            });
        }

        // Validation: Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ 
                success: false, 
                message: 'Passwords do not match' 
            });
        }

        // Validation: Password strength
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 6 characters long' 
            });
        }

        // Validation: Mobile number format
        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please enter a valid 10-digit mobile number' 
            });
        }

        // Check if user already exists by email
        const emailExists = await UserSign.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already exists' 
            });
        }

        // Check if mobile number already exists
        const mobileExists = await UserSign.findOne({ mobile });
        if (mobileExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'Mobile number already registered' 
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new UserSign({ 
            firstName, 
            lastName, 
            dob, 
            email, 
            password: hashedPassword, 
            mobile 
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully' 
        });
    } catch (error) {
        console.error('Signup Error:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: messages[0] || 'Validation error' 
            });
        }
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                success: false, 
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
}

module.exports = {userSignUp};