//!URL: localhost:300/categories
const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Routings
router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);

module.exports = router;