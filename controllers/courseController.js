const Course = require('../models/Course');
const Category = require('../models/Category');

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
    const categories = await Category.find();
    const categorySlug = req.query.categories; //Query atılan kategori
    const queriedCategory = await Category.findOne({ slug: categorySlug }); //Query atılan kategoriyi veri tabanından bulma
    let filter = {};
    if (categorySlug) {
      filter = { category: queriedCategory._id };
    }
    const courses = await Course.find(filter);

    res.status(200).render('courses', {
      courses,
      categories,
      categorySlug,
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
