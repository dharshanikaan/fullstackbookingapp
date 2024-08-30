const { Sequelize } = require('sequelize');

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'my sql',
  storage: 'database.sqlite'
});

module.exports = sequelize;