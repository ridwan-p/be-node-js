const Route = require('../Route')

class RouteFacade {
  
  static run() {
    return new Route()
  }
}

module.exports = RouteFacade.run()