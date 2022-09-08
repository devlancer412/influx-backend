const express = require('express')
const influencerCtrl = require('../controllers/influencer.controller')

const router = express.Router()

router.post('/', influencerCtrl.store)

router.get('/', influencerCtrl.getList)

module.exports = router
