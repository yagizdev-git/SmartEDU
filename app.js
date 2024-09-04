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
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfuly!');
  } catch (error) {
    console.log('connection failed ' + error);
  }
}
connectDB();
// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
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
const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server has started on port ${port}...`);
});
