const express = require('express');
const router = express.Router();
const { register, login, createAdmin, verifyEmail,verifyOTP } = require('../controllers/authController');
const {protect,admin} = require('../middleware/auth');


// Route for user registration
router.post('/register',protect,admin, register);

// Route for user login
router.post('/login', login);

// Route for creating an admin user
router.post('/create-admin', createAdmin);

// Route for email verification
router.get('/verify-email/:token', verifyEmail);
// router.post('/verify-otp', verifyOTP);

module.exports = router;