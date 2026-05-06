const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', propertyController.getAllProperties);
router.get('/my-properties', protect, propertyController.getMyProperties);
router.get('/wishlist', protect, propertyController.getWishlist);
router.post('/', protect, upload.array('images', 5), propertyController.createProperty);
router.put('/:id', protect, upload.array('images', 5), propertyController.updateProperty);
router.patch('/:id/status', protect, propertyController.togglePropertyStatus);
router.post('/:id/wishlist', protect, propertyController.toggleWishlist);
router.delete('/:id', protect, propertyController.deleteProperty);

module.exports = router;