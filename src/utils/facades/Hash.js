const Hash = require("../crypt/Hash");
const FacadeHandle = require("../handles/FacadeHandle");

module.exports = new Proxy(new Hash, FacadeHandle);
