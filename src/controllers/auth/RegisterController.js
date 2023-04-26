const User = require('../../models/User');
const BaseController = require('../../utils/controllers/BaseController');
const Hash = require('../../utils/crypt/Hash');
const { FormRegister } = require('../../forms/auth');

class RegisterController extends BaseController {

  async register(req, res) {
    // validation 
    const {name, username, password} = await this.validate(req.body)
    // find one 
    
    const pass = await new Hash(password).hash()
    const user = await User.create({username, name, password: pass})
    // hide password 
    const data = user.toJSON()
    delete data.password

    res.json({
      status: 'success',
      data: data
    })
  }

  validate(payload) {
    return FormRegister.validateAsync(payload)
  }

}

module.exports = RegisterController