// Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect('mongodb://localhost/smart-edu-db')
.then(()=>{
  console.log('Connected to DB!')
})
.catch((err)=>{
  console.log(err)
});

// Routings
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

// Server Start
const port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server has started on port ${port}...`);
});
