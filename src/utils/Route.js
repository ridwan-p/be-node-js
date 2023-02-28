const express = require('express')
const router = express.Router()

const METHOD_GET = 'get'
const METHOD_POST = 'post'
const METHOD_PUT = 'put'
const METHOD_PATCH = 'patch'
const METHOD_DELETE = 'delete'

class Route {
  // property 
  #baseRouter
  //
  //
  //
  constructor() {
    this.#baseRouter = router
  }
  

  static url(urlMethod, url, options) {
    const [BaseController, method] = options

    const baseController = new BaseController()
    baseController.setMethod(method)

    const self = new Route()
    self.#baseRouter[urlMethod](url, (req,res, next) => baseController.run(req,res, next))
  }

  static get(path, options) {
    Route.url(METHOD_GET, path, options)
  }

  static post(path, options) {
    Route.url(METHOD_POST, path, options)
  }

  static put(path, options) {
    Route.url(METHOD_PUT, path, options)
  }

  static patch(path, options) {
    Route.url(METHOD_PATCH, path, options)
  }

  static delete(path, options) {
    Route.url(METHOD_DELETE, path, options)
  }

  static use(path) {
    const self = new Route()
    self.#baseRouter.use(path)
  }

  static getRouter() {
    const self = new Route()
    return self.#baseRouter
  }
}

module.exports = Route