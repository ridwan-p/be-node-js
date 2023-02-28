const sequelize = require("sequelize");
const NotFoundError = require('../exceptions/NotFoundError')

class Model extends sequelize.Model {
  static async findOrFail(options){
    const data = await this.findOne(options)
    if(!data) throw new NotFoundError()
  
    return data
  }
}

module.exports = Model