const { ValidationError } = require("joi")
const NotFoundError = require("../exceptions/NotFoundError")

class BaseController {
  // property 
  #methodRun

  setMethod(method) {
    this.#methodRun = method
    return this
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
      } else if(error instanceof ValidationError){
        res.status(422)
        res.json(error.details.map((item) => ({
          key: item.context.key,
          message: item.message  
        })))
      } else {
        next(error)
      }

    }
  }

  run(req, res, next) {
    return this.#runMethod(req, res, next)
  }
}

module.exports = BaseController