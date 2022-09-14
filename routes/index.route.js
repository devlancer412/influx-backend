const express = require('express')
const influencersRoutes = require('./influencers.route')
const brandsRoutes = require('./brands.route')
const campaignsRoutes = require('./campaigns.route')
const tagsRoutes = require('./tags.route')
const issuesReportRoutes = require('./issuesReport.route')
const paymentLogRoutes = require('./paymentLogs.route')

const router = express.Router()

// influencers routes => /influencers
router.use('/influencers', influencersRoutes)

// brands routes => /brands
router.use('/brands', brandsRoutes)

// camgpaigns routes => /campaigns
router.use('/campaigns', campaignsRoutes)

// tags routes => /tags
router.use('/tags', tagsRoutes)

// issuesReport routes => /issues
router.use('/issues', issuesReportRoutes)

// paymentLog routes => /payment
router.use('/payment', paymentLogRoutes)

module.exports = router
