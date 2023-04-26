const Route = require('../utils/Route')
const UserController = require('../controllers/UserController')
const {auth} = require('../middlewares')

Route.get('/', [UserController, 'index', auth])
Route.get('/:userId', [UserController, 'show', auth])
Route.post('/', [UserController, 'store', auth])
Route.put('/:userId', [UserController, 'update', auth])
Route.delete('/:userId', [UserController, 'destroy', auth])

module.exports = Route.getRouter()