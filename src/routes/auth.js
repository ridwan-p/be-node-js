const Route = require('../utils/facades/Route')
const LoginController = require('../controllers/auth/LoginController')
const RegisterController = require('../controllers/auth/RegisterController')

Route.post('/login', [LoginController, 'login'])
Route.post('/register', [RegisterController, 'register'])

module.exports = Route.getRouter()