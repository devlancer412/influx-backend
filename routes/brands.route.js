const express = require('express')
const brandsCtrl = require('../controllers/brands.controller')

const router = express.Router()

router.post('/', brandsCtrl.store)

router.get('/', brandsCtrl.getList)

router.get('/:id', brandsCtrl.getById)

router.get('/brandId/:email', brandsCtrl.getBrandIdByEmail)

module.exports = router
