const User = require('../Models/SignUpUser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// User login functionality
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation: Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Compare the entered password with the stored password
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email 
            }, 
            process.env.JWT_SECRET || 'your-secret-key-change-this', 
            { expiresIn: '7d' }
        );

        // Send success response with user data and token
        res.status(200).json({ 
            success: true, 
            message: 'Login successful',
            user: {
                name: user.firstName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile
            },
            token
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};

// const userLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(400).send({ message: "Invalid Username" });
//         }

//         const isValid = bcrypt.compareSync(password, user.password);
//         if (!isValid) {
//             return res.status(400).send({ message: "Invalid Username or Password" });
//         }

//         // Generate JWT token (set expiration time if needed)
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Send token and user data to client
//         res.status(200).send({ message: "Login Successfully", token });
//     } catch (error) {
//         res.status(500).send("Internal Server Error");
//     }
// };


const getAll = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).send("Users Not Found");
        }
        res.send(users);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Add New User
const addUser = async (req, res) => {
    const newUser = new User({ ...req.body });
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).send("Invalid Data or Username Already Exists");
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const findUser = await User.findOne({ username: req.params.username });
        if (!findUser) return res.status(404).send('No User found with that Username');

        const updateUser = await User.updateOne({ username: req.params.username }, { $set: req.body });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).send("Invalid Data");
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const findUser = await User.findOneAndDelete({ username: req.params.username });
        if (!findUser) return res.status(404).send('No User found with that Username');

        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getAll, addUser, updateUser, deleteUser, userLogin };
