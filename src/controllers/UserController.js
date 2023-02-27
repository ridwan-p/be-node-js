const User = require('../models/User')
const Hash = require('../utils/crypt/Hash');

class UserController {
  async index(req, res) {
    const users = await User.findAll()
    
    res.json(users);
  }

  async store(req, res) {
    const {username, name, password} = req.body
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

  async update(req, res) {
    const {userId} = req.params
    const user = await User.findOne({where:{id: userId}})
    // save data 
    const {username, name, password} = req.body
    const pass = await new Hash(password).hash()
    user.set({username, name, password: pass})
    await user.save()
    // hide password 
    const data = user.toJSON()
    delete data.password

    res.json({
      status: 'success',
      data: data
    })
  }

  async destroy(req, res) {
    const {userId} = req.params
    const user = await User.findOne({where:{id: userId}})
    await user.destroy()
    // hide password 
    const data = user.toJSON()
    delete data.password
    
    res.json({
      status: 'success',
      data: data
    })
  }
}

module.exports = UserController