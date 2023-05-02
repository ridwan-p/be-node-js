const User = require('../../models/User');
const Controller = require('../Controller');
const Hash = require('../../utils/facades/Hash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const appConfig = require('../../configs/app');

class LoginController extends Controller {
  #expiresInAmount = 3;
  #expiresInUnit = 'days';
  
  async login(req, res) {
    // validation 
    const payload = await this.validate(req.body);
    // find one 
    const username = payload[this.username()];
    const user = await User.findOne({where: {username}});
    // compire password 
    if(user && (await this.authenticate(payload.password, user.password))) {
      // generate token 
      const token = this.token(user);
      const expiresIn = this.getExpiresIn();
      return res.status(200).json({
        token: token,
        expiresIn: moment().add(expiresIn.amount, expiresIn.unit)
      });
    }
    res.status(400).send('Invalid Credentials');
  }

  authenticate(password, hash) {
    return Hash.compare(hash, password);
  }

  token(user) {
    return jwt.sign(
      {userId: user.id, username: user.username},
      appConfig.tokenKey,
      {expiresIn: this.getExpiresInText()}
    );
  }

  validate(payload) {
    return Joi.object({
      [this.username()]: Joi.string().required(),
      password: Joi.string().required()
    }).options({abortEarly: false})
      .validateAsync(payload);
  }

  username() {
    return 'email';
  }

  getExpiresInText() {
    const expiresIn = this.getExpiresIn();
    return `${expiresIn.amount} ${expiresIn.unit}`;
  }

  getExpiresIn() {
    return {
      amount: this.#expiresInAmount,
      unit: this.#expiresInUnit,
    };
  }

  setExpiresIn(amount, unit) {
    this.#expiresInAmount = amount;
    this.#expiresInUnit = unit;
  }

}

module.exports = LoginController;