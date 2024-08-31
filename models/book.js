const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Booking = sequelize.define('Booking', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Booking;