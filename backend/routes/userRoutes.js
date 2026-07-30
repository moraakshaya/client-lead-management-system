const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');

const { 
    getAllUsers, 
    createUser,
    updateUser,
    deleteUser,
    resetUserPassword,
    getProfile, 
    updateProfile, 
    updatePassword 
} = require('../controllers/userController');

// Settings Endpoints (Protected)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), updateProfile);
router.put('/password', authMiddleware, updatePassword);

// Admin Endpoints
router.get('/', authMiddleware, requireAdmin, getAllUsers);
router.post('/', authMiddleware, requireAdmin, createUser);
router.put('/:id', authMiddleware, requireAdmin, updateUser);
router.delete('/:id', authMiddleware, requireAdmin, deleteUser);
router.put('/:id/reset-password', authMiddleware, requireAdmin, resetUserPassword);

module.exports = router;
