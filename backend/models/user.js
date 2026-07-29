const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true, // Will require it, but existing docs might not have it.
        // Usually we'd set default or handle missing password during login
    },
    role: {
        type: String,
        enum: ['Admin', 'Sales Manager', 'Sales Executive'],
        default: 'Sales Executive'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
