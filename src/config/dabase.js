// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('xAcademyChallenge', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
