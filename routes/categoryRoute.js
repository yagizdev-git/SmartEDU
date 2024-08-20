const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Routings
router.route('/').post(categoryController.createCategory); //url: localhost:300/categories şeklinde

module.exports = router;