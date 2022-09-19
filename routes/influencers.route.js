const express = require('express')
const influencersCtrl = require('../controllers/influencers.controller')

const router = express.Router()

router.post('/', influencersCtrl.store)

router.get('/', influencersCtrl.getList)

router.get('/:id', influencersCtrl.getById)

module.exports = router
