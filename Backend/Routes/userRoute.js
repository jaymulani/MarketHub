const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const { registerUser, loginUser, getUserDetails, getAllUsers } = require('../Controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUserDetails);
router.get('/', authMiddleware, getAllUsers);

module.exports = router;