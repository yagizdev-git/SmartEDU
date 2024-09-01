const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

// Routings
router.route('/').post(roleMiddleware(["teacher", "admin"]), courseController.createCourse); //url: localhost:300/courses şeklinde
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/delete').post(courseController.deleteCourse);

module.exports = router;