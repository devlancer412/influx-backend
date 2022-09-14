const express = require('express')
const campaignsCtrl = require('../controllers/campaigns.controller')

const router = express.Router()

router.post('/', campaignsCtrl.store)

router.get('/', campaignsCtrl.getList)

router.post('/addInfluencer', campaignsCtrl.addInfluencer)

router.get('/:id', campaignsCtrl.getById)

module.exports = router
