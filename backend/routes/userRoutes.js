
const express = require('express');
const { createUser, authenticateUser, logout, checkAuth } = require('../controllers/userControllers');

const router = express.Router();

// router.get('/', authenticateToken);
router.get('/check', checkAuth);
router.post('/signup', createUser);
router.post('/login', authenticateUser);
router.get('/logout', logout);


module.exports = router;