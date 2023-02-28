const Route = require('../utils/Route')
const UserController = require('../controllers/UserController')

Route.get('/', [UserController, 'index'])
Route.get('/:userId', [UserController, 'show'])
Route.post('/', [UserController, 'store'])
Route.put('/:userId', [UserController, 'update'])
Route.delete('/:userId', [UserController, 'destroy'])

module.exports = Route.getRouter()