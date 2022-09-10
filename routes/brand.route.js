const express = require('express')
const brandCtrl = require('../controllers/brand.controller')

const router = express.Router()

router.post('/', brandCtrl.store)

router.get('/', brandCtrl.getList)

module.exports = router
