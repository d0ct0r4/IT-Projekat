const express = require('express');
const router = express.Router();
const { loginUser, registerUser, registerStaff, getAllUsers, deleteUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/registerStaff', registerStaff);
router.get('/', getAllUsers);
router.delete('/delete/:id', deleteUser);

module.exports = router;
