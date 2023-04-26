const { env } = require("../utils/environment");

module.exports = {
  name : env(process.env.APP_NAME, 'be-node-js'),
  tokenKey : env(process.env.TOKEN_KEY, 's4k13u'),
}