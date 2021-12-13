const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use((req, res, next) => {
  console.log('I am middleware');
  next(); // allows request to continue to the next middleware in line
});
app.use((req, res, next) => {
  console.log('I am more middleware');
  res.send('<h1>Hello from express</h1>');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
