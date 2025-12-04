const UserSign = require('../Models/SignUpUser')
const bcrypt = require('bcrypt');

//user Sign Up Functionality

const userSignUp = async (req, res) => {
    try {
        const { firstName,lastName,dob, email, password,mobile,confirmPassword } = req.body
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const userExists = await UserSign.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Create a new user
        const user = new UserSign({ firstName,lastName,dob, email, password,mobile })

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // Save the user to the database
        await user.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {userSignUp};