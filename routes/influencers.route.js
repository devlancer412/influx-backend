const express = require('express')
const influencersCtrl = require('../controllers/influencers.controller')

const router = express.Router()

router.post('/', influencersCtrl.store)

router.get('/', influencersCtrl.getList)

module.exports = router
