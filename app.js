const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const bookingRoutes = require('./routes/book');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use booking routes
app.use('/', bookingRoutes);

// Initialize database and start server
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));