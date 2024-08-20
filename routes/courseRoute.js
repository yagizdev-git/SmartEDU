const express = require('express');
const courseController = require('../controllers/courseController');
const categoryController = require('../controllers/categoryController')
const router = express.Router();

// Routings
router.route('/').post(courseController.createCourse); //url: localhost:300/courses şeklinde
router.route('/')
  .get(courseController.getAllCourses, categoryController.getAllCategories);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;