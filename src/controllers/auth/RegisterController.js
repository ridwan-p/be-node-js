const User = require('../../models/User');
const Controller = require('../Controller');
const Hash = require('../../utils/facades/Hash');
const { FormRegister } = require('../../forms/auth');

class RegisterController extends Controller {

  async register(req, res) {
    // validation 
    const {name, username, password} = await this.validate(req.body);
    const pass = await Hash.hash(password);
    const user = await User.create({username, name, password: pass});

    res.json({
      status: 'success',
      data: user
    });
  }

  validate(payload) {
    return FormRegister.validateAsync(payload);
  }

}

module.exports = RegisterController;