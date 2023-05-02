const { env } = require('../utils/environment');

module.exports = {
  connection : env(process.env.DB_CONNECTION, 'mysql'),
  host : env(process.env.DB_HOST, 'localhost'),
  username : env(process.env.DB_USERNAME),
  password : env(process.env.DB_PASSWORD),
  name : env(process.env.DB_NAME)
};