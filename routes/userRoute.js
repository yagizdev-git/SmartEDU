//! URL: localhost:300/users/
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Routings
router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name!'),
    body('password').not().isEmpty().withMessage('Please Enter Your Password!'),
    body('email').isEmail().withMessage('Please Enter a valid E-mail!')
    .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('E-mail is Already Exists!');
          }
        });
      }),
  ],
  authController.createUser
);
router.route('/login').post(authController.userLogin);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);

module.exports = router;