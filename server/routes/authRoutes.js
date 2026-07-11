const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOTP,
  getProfile,
  updateProfile,
  resetPassword,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/reset-password', protect, resetPassword);

module.exports = router;