const Route = require('../routes/Route');
const FacadeHandle = require('../handles/FacadeHandle');

module.exports = new Proxy(new Route, FacadeHandle);