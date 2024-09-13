const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

class Booking extends Model {}

Booking.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Booking',
});

module.exports = Booking;