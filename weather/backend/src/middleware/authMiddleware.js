const JWT = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token is missing' });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        
        // Token mein id, _id ya userId jo bhi hoga usko catch karega
        const userId = decoded.id || decoded._id || decoded.userId;

        if (!userId) {
            return res.status(401).json({ message: "Invalid token payload: User ID missing" });
        }

        // Always set both _id and id safely
        req.user = { _id: userId, id: userId };
        
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: "Invalid or expired token", 
            error: error.message 
        });
    }
};

module.exports = authMiddleware;