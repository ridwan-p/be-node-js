const inversify = require('inversify');
require('reflect-metadata');

exports.inversify = inversify;
exports.container = new inversify.Container();

module.exports = exports;
