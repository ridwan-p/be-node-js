const NotFoundError = require("../exceptions/NotFoundError")

class BaseController {
  // property 
  #methodRun

  setMethod(method) {
    this.#methodRun = method
  }

  getMethod() {
    return this.#methodRun
  }

  async #runMethod(req, res, next) {
    try {
      await this[this.getMethod()](req,res, next)
    } catch (error) {
      if(error instanceof NotFoundError) {
        res.status(404)
        res.json(error.message)
      }
    }
  }

  run(req, res, next) {
    return this.#runMethod(req, res, next)
  }
}

module.exports = BaseController