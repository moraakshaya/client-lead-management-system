const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

const { 
    getAllUsers, 
    createUser, 
    getProfile, 
    updateProfile, 
    updatePassword 
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);

// Settings Endpoints (Protected)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), updateProfile);
router.put('/password', authMiddleware, updatePassword);

module.exports = router;
