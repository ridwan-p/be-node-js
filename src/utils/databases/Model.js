const sequelize = require('sequelize');
const NotFoundError = require('../exceptions/NotFoundError');

class Model extends sequelize.Model {
  static async findOrFail(options){
    const data = await this.findOne(options);
    if(!data) throw new NotFoundError();
  
    return data;
  }

  static async paginate({perPage = 10, page=1} = {}, options) {
    perPage = Number(perPage);
    page = Number(page);
    const {rows, count} = await this.findAndCountAll({
      ...options,
      limit: perPage,
      offset: (page -1) * perPage,
    });
    const lastPage = Math.ceil(count/perPage);
    return {
      total: count,
      perPage: perPage,
      currentPage: page,
      nextPage: page < lastPage ? page + 1: null ,
      prevPage: page > 1 ? page -1 : null,
      lastPage: lastPage,
      data: rows
    };
  }
}

module.exports = Model;