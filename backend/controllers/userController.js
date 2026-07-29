const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ name: 1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        // Hash password if provided
        let hashedPassword = '';
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        } else {
            hashedPassword = await bcrypt.hash('admin123', 10); // default for testing
        }

        const newUser = await User.create({
            ...rest,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- SETTINGS ENDPOINTS ---

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId || req.user.id || req.user._id;
        // Fetch the currently logged-in user using the ID from the JWT token
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("UPDATE PROFILE TRIGGERED");
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);
        
        const userId = req.user.userId || req.user.id || req.user._id;
        // Find the currently logged-in user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        const { name, email, phone, company, bio } = req.body;

        // If email changed, check for duplicates
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists." });
            }
        }

        // Handle avatar upload
        let avatarPath = user.avatar;
        if (req.file) {
            avatarPath = `/uploads/${req.file.filename}`;
        } else if (req.body.removeAvatar === 'true') {
            avatarPath = '';
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { name, email, phone, company, bio, avatar: avatarPath },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const userId = req.user.userId || req.user.id || req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        // Compare password (handle case where user record was created before password field existed)
        if (!user.password) {
            if (currentPassword !== 'admin123') {
                return res.status(400).json({ message: "Incorrect current password." });
            }
        } else {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect current password." });
            }
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
