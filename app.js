// Requirements
const express = require('express');
const app = express();

// Middlewares
app.set('view engine', 'ejs');

// Routings
app.get('/', (req, res) => {
  res.send('sa');
});

// Server Start
const port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server has started on port ${port}...`);
});
