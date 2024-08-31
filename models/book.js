const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
  
});

module.exports = Booking;