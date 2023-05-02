const sequelize = require('sequelize');
const connection = require('../utils/databases/connection');
const Model = require('../utils/databases/Model');

class User extends Model {
  _hidden = [
    'password'
  ];
}

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
});

module.exports = User;