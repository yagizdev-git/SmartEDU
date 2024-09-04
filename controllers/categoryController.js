const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash('success', 'Category created!');
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'An error occured while creating a category...');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const courses = await Course.find({ category: req.params.id });

    if (category) {
      const pullCategory = async (courses) => {
        try {
          const pullPromises = courses.map((course) => course.updateOne({ $unset: { category: 1 } }));
          await Promise.all(pullPromises);
        } catch (error) {
          req.flash('error', 'An error occured while deleting the category...');
          res.status(500).redirect('/users/dashboard');
        }
      }
      await category.deleteOne();
      await pullCategory(courses);
      req.flash('success', 'Category deleted!');
      res.status(202).redirect('/users/dashboard');
    }
  } catch (error) {
    req.flash('error', 'Internal Server Error');
    res.status(500).redirect('/users/dashboard');
  }
};