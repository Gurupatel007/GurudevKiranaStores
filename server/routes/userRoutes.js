const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/admin/users', protect, admin, getAllUsers);
router.delete('/admin/users/:id', protect, admin, deleteUser);

module.exports = router;