const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const { protect } = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuth');

router.get('/users', protect, adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });

    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const count = await Property.countDocuments({ seller: user._id });
        return { ...user._doc, propertiesCount: count };
      })
    );

    res.json(usersWithCounts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;