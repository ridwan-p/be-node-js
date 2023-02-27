const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

const user = new UserController()

router.get('/', user.index)
router.post('/', user.store)
router.put('/:userId', user.update)
router.delete('/:userId', user.destroy)

module.exports = router