const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/', require('./auth'))

module.exports = router