const express = require('express')
const tagsCtrl = require('../controllers/tags.controller')

const router = express.Router()

router.post('/', tagsCtrl.store)

router.get('/', tagsCtrl.getList)

router.post('/addTag', tagsCtrl.addTag)

module.exports = router
