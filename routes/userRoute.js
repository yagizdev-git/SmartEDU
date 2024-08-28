const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Routings
router.route('/signup').post(authController.createUser); //url: localhost:300/users/signup
router.route('/login').post(authController.userLogin); //url: localhost:300/users/login
router.route('/logout').get(authController.logoutUser); //url: localhost:300/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //url: localhost:300/users/dashboard

module.exports = router;