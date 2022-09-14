const express = require('express')
const brandsCtrl = require('../controllers/brands.controller')

const router = express.Router()

router.post('/', brandsCtrl.store)

router.get('/', brandsCtrl.getList)

module.exports = router
