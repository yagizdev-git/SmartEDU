const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).render('courses', {
      courses,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courseSlug = req.params.slug;
    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      res.status(404).json({ message: 'Course not found!' });
    }
    res.status(200).render('course', {
      course,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
