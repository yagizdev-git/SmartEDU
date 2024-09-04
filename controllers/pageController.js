const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-dateCreated').limit(2);
  const courseQnt = await Course.find().countDocuments();
  const studentQnt = await User.countDocuments({ role: 'student' });
  const teacherQnt = await User.countDocuments({ role: 'teacher' });
  
  res.status(200).render('index', {
    pageName: 'index',
    courses,
    courseQnt,
    studentQnt,
    teacherQnt
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};

exports.getCoursesPage = (req, res) => {
  res.status(200).render('courses', {
    pageName: 'courses',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};

exports.sendMail = async (req, res) => {
  let outputMessage = `
  
  <h1>From:</h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>E-Mail: ${req.body.email}</li>
  </ul>

  <br><br>
  
  <h1>Message</h1>
  <p>${req.body.message}</p>
  
  `;

  // SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.mail,
      pass: process.env.pass,
    },
  });

  // Mail content
  const mailOptions = {
    from: `"SmartEDU Contact Form" <${process.env.mail}>`,
    to: 'endback0707@gmail.com',
    subject: 'SmartEDU Contact Form',
    html: outputMessage,
  };

  // Send m & flash message
  try {

    await transporter.sendMail(mailOptions);
    req.flash('success', 'Mail sent successfully!');
    res.status(200).redirect('/contact');

  } catch (error) {

    console.error('An error occured:', error);
    req.flash('error', 'An error occurred while sending your mail!');
    res.status(500).redirect('/contact');
    
  }
};