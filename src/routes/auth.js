const Route = require('../utils/facades/Route')
const LoginController = require('../controllers/auth/LoginController')

Route.post('/login', [LoginController, 'login'])

module.exports = Route.getRouter()