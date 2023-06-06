const { container, inversify } = require('../di/ioc');
const Route = require('../routes/Route');

const name = 'Utils.Routes.Route';
inversify.decorate(inversify.injectable(), Route);

container.bind(name).to(Route);

module.exports = container.get(name);