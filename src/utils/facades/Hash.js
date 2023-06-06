const { container, inversify } = require('../di/ioc');
const Hash = require('../crypt/Hash');

const name = 'Utils.Crypt.Hash';
inversify.decorate(inversify.injectable(), Hash);

container.bind(name).to(Hash);

module.exports = container.get(name);