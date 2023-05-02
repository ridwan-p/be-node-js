const Joi = require('joi');
const { Op } = require('sequelize');
const User = require('../models/User');

exports.FormStore = () => {
  return Joi.object({
    username: Joi.string().min(3).max(30).required().external(async (username) => {
      const user = await User.findOne({where: {username}});
      // user is exists
      if(user) {
        const message = 'username is unique';
        throw new Joi.ValidationError(message, [
          {
            message: message,
            context: {
              key: 'username',
              label: 'username'
            }
          }
        ]);
      }
      return username;
    }),
    name: Joi.string().min(1).max(191).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strict(),
  }).options({abortEarly: false});
};

exports.FormUpdate = (id) => {
  return Joi.object({
    username: Joi.string().min(3).max(30).required().external(async (username) => {
      const user = await User.findOne({where: {
        username,
        id:{
          [Op.ne]: id
        }
      }});
      // user is exists
      if(user) {
        const message = 'username is unique';
        throw new Joi.ValidationError(message, [
          {
            message: message,
            context: {
              key: 'username',
              label: 'username'
            }
          }
        ]);
      }
      return username;
    }),
    name: Joi.string().min(1).max(191).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strict(),
  }).options({abortEarly: false});
};

module.exports = exports;
