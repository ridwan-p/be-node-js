const appConfig = require('../configs/app');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class Authentication {
  async handle(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    try {
      const clearToken = token.replace('Bearer ', '');
      const decoded = jwt.verify(clearToken, appConfig.tokenKey);
      const user = await User.findOrFail({where:{id: decoded.userId}});
      req.user = user;
    } catch (err) {
      console.log('err', err);
      return res.status(401).send('Invalid Token');
    }
    return next();
  }
}

module.exports = Authentication;
