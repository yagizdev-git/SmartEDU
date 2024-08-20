const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    res.status(200).render('courses', {
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};
