const User = require('../Models/SignUpUser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// User login functionality
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid Username ");
        }
        
        // const salt = await bcrypt.genSalt(10)
        // user.password = await bcrypt.hash(password, salt);
        
        // Compare the entered password with the stored password
        const isValid = bcrypt.compareSync(password,user.password)
        // if (password != user.password) {
        //     return res.status(400).send("Invalid Username or Password");
        // }
        
        if (!isValid) {
            return res.status(400).send("Invalid Username or Password");
        }

        // If username and password are correct, send success message
        res.status(200).send("Login Successfully");

    } catch (error) {
        res.status(500).send("Internal Server Error");
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
