const { FormStore } = require('../forms/users');
const User = require('../models/User');
const Controller = require('./Controller');
const Hash = require('../utils/facades/Hash');

class UserController extends Controller {
  async index(req, res) {
    const users = await User.paginate({
      perPage: req.query.perPage || req.body.perPage,
      page: req.query.page || req.body.page,
    });
    
    res.status(200).json(users);
  }

  async show(req, res) {
    const {userId} = req.params;
    const user = await User.findOrFail({where:{id: userId}});
    res.json(user);
  }

  async store(req, res) {
    const {username, name, password} = await FormStore.validateAsync(req.body);

    const pass = await Hash.hash(password);
    const user = await User.create({username, name, password: pass});
    // hide password 
    const data = user.toJSON();
    delete data.password;

    res.json({
      status: 'success',
      data: data
    });
  }

  async update(req, res) {
    const {userId} = req.params;
    const user = await User.findOrFail({where:{id: userId}});
    // save data 
    const {username, name, password} = req.body;
    const pass = await Hash.hash(password);
    user.set({username, name, password: pass});
    await user.save();
    // hide password 
    const data = user.toJSON();
    delete data.password;

    res.json({
      status: 'success',
      data: data
    });
  }

  async destroy(req, res) {
    const {userId} = req.params;
    const user = await User.findOrFail({where:{id: userId}});
    await user.destroy();
    // hide password 
    const data = user.toJSON();
    delete data.password;
    
    res.json({
      status: 'success',
      data: data
    });
  }
}

module.exports = UserController;