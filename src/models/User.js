const sequelize = require("sequelize");
const connection = require("../utils/databases/connection");

const User = connection.define('User', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  defaultScope:{
    attributes:{exclude: ['password']}
  },
  scopes: {
    withPassword: {
      attributes: {}
    }
  }
})

module.exports = User