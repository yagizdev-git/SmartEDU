const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Routings
router.route('/signup').post(authController.createUser); //url: localhost:300/users/signup

module.exports = router;