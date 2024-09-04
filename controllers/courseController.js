const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      creator: req.session.userID,
    });
    req.flash('success', 'Course created successfully!');
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', 'An error occurred while creating the course!');
    res.status(400).redirect('/courses');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categories = await Category.find();
    const categorySlug = req.query.categories; //Query atılan kategori
    const queriedCategory = await Category.findOne({ slug: categorySlug }); //Query atılan kategoriyi veri tabanından bulma
    const searchQuery = req.query.search; //search'e yazılan değer

    let filter = {};

    if (categorySlug) {
      filter = { category: queriedCategory._id };
    }
    if (searchQuery) {
      filter = {name: searchQuery}
    }
    if (!searchQuery && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const courses = await Course.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i' }},
        {category: filter.category}
      ]
    })
    .populate({
      path: 'creator',
      select: 'name'
    })
    .sort('-dateCreated');

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
    const course = await Course.findOne({ slug: courseSlug })
    .populate([
      { path: 'creator' },
      { path: 'category' },
    ]);
    const categories = await Category.find();
    const user = await User.findById(req.session.userID);

    if (!course) {
      res.status(404).json({ message: 'Course not found!' });
    }
    res.status(200).render('course', {
      course,
      categories,
      user,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    req.flash('success', 'Course Enrolled!');
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    req.flash('error', 'Course couldn\'t be Enrolled!');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    req.flash('success', 'Course Released!');
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    req.flash('error', 'Course couldn\'t be released!');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.deleteOne( { _id: req.body.course_id } );
    const users = await User.find({ courses: req.body.course_id });
    if (users) {
      users.forEach(async (user)=>{
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();
      });
    }

    req.flash('success', 'Course deleted successfully!');
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    req.flash('error', 'An error occurred while deleting the course!');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();

    res.status(200).redirect('/users/dashboard');
  } catch (err) {

    res.status(400).redirect('/users/dashboard');
  }
};