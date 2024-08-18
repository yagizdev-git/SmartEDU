const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

// Routings
router.route('/').post(courseController.createCourse); //url: localhost:300/courses şeklinde
router.route('/').get(courseController.getAllCourses);

module.exports = router;