const jwt = require('jsonwebtoken');
const UserModel = require('../models/AuthModels');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await UserModel.findById(decoded.userId).select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.userId = req.user._id;  // ✅ Fix: Set userId properly
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

