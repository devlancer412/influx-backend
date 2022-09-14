const express = require('express')
const paymentLogCtrl = require('../controllers/paymentLog.controller')

const router = express.Router()

router.post('/', paymentLogCtrl.store)

router.get('/', paymentLogCtrl.getList)

module.exports = router
