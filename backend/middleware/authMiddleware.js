const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get the token from the header
        // It usually comes in the format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // 2. Extract the actual token string
        const token = authHeader.split(' ')[1];

        // 3. Verify the token mathematically using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the decoded user ID to the request object so routes can use it
        req.user = decoded;

        // 5. Let the user proceed to the actual controller function
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
