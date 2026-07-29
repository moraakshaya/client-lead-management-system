const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2. Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. Generate the JWT (The magic part!)
        // We pack the user's ID into the payload and sign it with our secret key.
        // We also set it to expire in 1 day for security.
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Send the token and user data back to the frontend
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// FORGOT PASSWORD - Generates a temporary token
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account found with that email." });
        }

        // Generate a temporary 15-minute token specifically for resetting the password
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Normally you would email this link, but for now we just return it!
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        res.status(200).json({
            message: "Password reset link generated!",
            resetLink: resetLink
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// RESET PASSWORD - Verifies the token and updates the DB
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // 1. Verify the token is valid and hasn't expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Update the user in the database
        await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

        res.status(200).json({ message: "Password has been successfully reset!" });

    } catch (err) {
        res.status(400).json({ message: "Invalid or expired reset token." });
    }
};

