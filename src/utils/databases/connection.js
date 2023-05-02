const {Sequelize} = require('sequelize');
const db = require('../../configs/database');

const connection = new Sequelize(
  db.name, 
  db.username, 
  db.password,
  {
    dialect: db.connection,
    host: db.host,
  }
);

module.exports = connection;