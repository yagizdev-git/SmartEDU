// Requirements
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

// Template Engine
app.set('view engine', 'ejs');

// Global Variables
global.userIN = null;

// DB Connection
mongoose
  .connect('mongodb://localhost/smart-edu-db')
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch((err) => {
    console.log(err);
  });
// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smart-edu-db' }),
  })
);
// Flash Package
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success');
  res.locals.errorMsg = req.flash('error');
  next();
});
// Method-Override
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
// Routings
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

// Server Start
const port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server has started on port ${port}...`);
});
