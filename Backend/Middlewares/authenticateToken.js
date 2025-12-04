const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Expected: Bearer <token>
    if (!token) return res.status(401).send("Access Denied. No token provided.");

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;  // Store user info from token in req.user
        next();  // Continue to the next middleware or route handler
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = authenticateToken;
