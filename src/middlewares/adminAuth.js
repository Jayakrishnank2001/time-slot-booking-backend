const { verifyToken } = require("../utils/jwtUtils");

const adminAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    const admin = verifyToken(token);
    if (admin == null) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    if (!admin) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    
    req.admin = admin;
    next();
};

module.exports = adminAuthMiddleware;
