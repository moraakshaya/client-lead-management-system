const requireAdmin = (req, res, next) => {
    // req.user is set by authMiddleware
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
};

module.exports = requireAdmin;
