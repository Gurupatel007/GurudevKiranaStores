const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct, getProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');

router.get('/', protect, getProducts);
router.post('/', protect, admin, uploadImage, addProduct);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;