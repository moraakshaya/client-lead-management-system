const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const { 
    getAllUsers, 
    createUser, 
    getProfile, 
    updateProfile, 
    updatePassword 
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);

// Settings Endpoints
router.get('/profile', getProfile);
router.put('/profile', upload.single('avatar'), updateProfile);
router.put('/password', updatePassword);

module.exports = router;
