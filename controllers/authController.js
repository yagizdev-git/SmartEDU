const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    /*
    errors.array().forEach((err)=>{
      req.flash('error', `${err.msg}`);
    });
    */
    req.flash('error', `${errors.array()[0].msg}`);
    res.status(400).redirect('/register');
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          res.status(500).send('An error occured during password comparsion.');
        }
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', 'Password is wrong!');
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', 'User not found!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find().sort('name');
  const courses = await Course.find({ creator: req.session.userID })
    .populate({
      path: 'creator',
      select: 'name',
    })
    .populate({
      path: 'category',
      select: 'name',
    });
  const allUsers = await User.find().sort('-role');

  res.status(200).render('dashboard', {
    pageName: 'dashboard',
    user,
    allUsers,
    categories,
    courses,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.role !== "admin") {
      if (user.role === "teacher") {
        // Finding teacher's all courses
        const courses = await Course.find({ creator: user._id });
        // Deleting that teacher's course
        const deleteCourses = async (courses) => {
          const deletePromises = courses.map(course => course.deleteOne());
          await Promise.all(deletePromises);
        }
        await deleteCourses(courses);
      }
      await user.deleteOne();
      req.flash('success', 'User deleted!');
      res.status(201).redirect('/users/dashboard');
    } else {
      req.flash('error', "You can't delete other admin users");
      res.status(401).redirect('/users/dashboard');
    }
  } catch (error) {
    req.flash('error', 'An error occured while deleting the user...');
    res.status(400).redirect('/users/dashboard');
  }
};
