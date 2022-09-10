const express = require('express')
const influencerRoutes = require('./influencer.route')

const router = express.Router()

// influencer routes => /influencer
router.use('/influencer', influencerRoutes)


module.exports = router
