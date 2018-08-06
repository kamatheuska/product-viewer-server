const express = require('express')
const path = require('path')
const router = express.Router()

router.use('/products', require('./products'))
router.use('/api', require('./api'))
router.use('/designers', require('./designers'))
router.use('/manufacturers', require('./manufacturers'))
router.use('/errors', require('./errors'))

module.exports = router
