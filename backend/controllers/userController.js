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

// --- ADMIN ENDPOINTS (Manage other users) ---

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email already exists for another user
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists." });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (phone !== undefined) user.phone = phone;
        user.role = role || user.role;

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json(userResponse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const currentUserId = req.user.userId || req.user.id || req.user._id;
        if (id === currentUserId) {
            return res.status(400).json({ message: "You cannot delete your own account." });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.resetUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "User password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
