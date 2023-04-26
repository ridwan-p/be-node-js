const Route = require('../utils/Route')
const LoginController = require('../controllers/auth/LoginController')

Route.post('/login', [LoginController, 'login'])

module.exports = Route.getRouter()