const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const authenticateToken = (req, res, next) => {
    // Check Authorization header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: "Access Denied. No token provided." 
        });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Access Denied. No token provided." 
        });
    }
    
    try {
        // Verify token
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Token expired" 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token" 
            });
        }
        
        // For any other errors
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

module.exports = authenticateToken;