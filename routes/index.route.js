const express = require('express')
const influencerRoutes = require('./influencer.route')

const router = express.Router()

// auth routes => /auth
router.use('/influencer', influencerRoutes)


module.exports = router
