const express = require('express');
const router = express.Router();
const BaseController = require('../controllers/BaseController');

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_PATCH = 'patch';
const METHOD_DELETE = 'delete';

class Route {
  // property 
  #baseRouter;
  #paths = [];
  //
  //
  //
  constructor() {
    this.#baseRouter = router;
  }

  pushPath(type, url, options) {
    this.#paths.push({
      type,
      url,
      options
    });
  }

  getPaths() {
    return this.#paths;
  }

  setBaseRouter(type, url, options) {
    this.#baseRouter[type](url, options);
  }

  getBaseRoute() {
    return this.#baseRouter;
  }

  url(type, url, ...options) {
    this.pushPath(type, url, options);
  }

  get(path, ...options) {
    this.url(METHOD_GET, path, ...options);
  }

  post(path, ...options) {
    this.url(METHOD_POST, path, ...options);
  }

  put(path, ...options) {
    this.url(METHOD_PUT, path, ...options);
  }

  patch(path, ...options) {
    this.url(METHOD_PATCH, path, ...options);
  }

  delete(path, ...options) {
    this.url(METHOD_DELETE, path, ...options);
  }

  use(path) {
    this.#baseRouter.use(path);
  }

  #generateController(arr) {
    const [Controller, method] = arr;
    if(typeof Controller !== 'function') throw new SyntaxError('Controller is not class');
    const controller = new Controller();
    // eslint-disable-next-line no-prototype-builtins
    if(BaseController.prototype.isPrototypeOf(controller)) {
      return (req, res, next) => controller.setMethod(method).run(req,res, next);
    }
    return null;
  } 

  get router() {
    const paths = this.getPaths();
    for (let i = 0; i < paths.length; i++) {
      const {type, url, options} = paths[i];
      // modif options with controller 
      for (let j = 0; j < options.length; j++) {
        const el = options[j];
        if(Array.isArray(el)) {
          options[j] = this.#generateController(el);
        } else if( typeof el === 'function') {
          options[j] = el;
        } else {
          options[j] = null;
        }
      }
      this.setBaseRouter(type, url, options);
    }
    return this.getBaseRoute();
  }
}

module.exports = Route;