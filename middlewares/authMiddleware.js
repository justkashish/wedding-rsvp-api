const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async(req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

        token = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (!decoded.id) return res.status(401).json({ message: 'Invalid token' });

        req.user = await User.findById(decoded.id).select('-password'); // Exclude password field
        if (!req.user) return res.status(401).json({ message: 'User not found' });

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;