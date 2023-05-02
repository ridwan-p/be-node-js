const sequelize = require('sequelize');
const connection = require('../utils/databases/connection');
const Model = require('../utils/databases/Model');

class User extends Model {}

User.init({
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
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
  sequelize: connection,
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  defaultScope:{
    attributes:{exclude: ['password']}
  },
  scopes: {
    withPassword: {
      attributes: {}
    }
  }
});

module.exports = User;