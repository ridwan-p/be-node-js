const Route = require('../utils/facades/Route')
const UserController = require('../controllers/UserController')
const {auth} = require('../middlewares')

Route.get('/', auth, [UserController, 'index'])
Route.get('/:userId', auth, [UserController, 'show'])
Route.post('/', auth, [UserController, 'store'])
Route.put('/:userId', auth, [UserController, 'update'])
Route.delete('/:userId', auth, [UserController, 'destroy'])

module.exports = Route.router