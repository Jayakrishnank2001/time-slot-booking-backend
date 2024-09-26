const { verifyToken } = require("../utils/jwtUtils");

const userAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    const user = verifyToken(token);
    if (user == null) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    if (!user) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    
    req.user = user;
    next();
};

module.exports = userAuthMiddleware;
