// Middleware to check authorization
const jwt = require('jsonwebtoken'); 

const authMiddleware = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract the token
    
        if (!token) {
            // If no token, deny access
            return res.status(401).json({ message: 'Unauthorized: Token not found' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Unauthorized: Invalid token' });
            }

            // Attach the user info to the request object
            req.user = user;

            // Continue to the next middleware or route handler
            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = authMiddleware;