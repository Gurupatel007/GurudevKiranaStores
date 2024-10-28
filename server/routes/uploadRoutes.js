const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { uploadImage, uploadImageToCloudinary } = require('../controllers/uploadController');

router.post('/upload',protect,admin,uploadImage,uploadImageToCloudinary);

module.exports = router;