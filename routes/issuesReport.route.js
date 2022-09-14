const express = require('express')
const issuesReportCtrl = require('../controllers/issuesReport.controller')

const router = express.Router()

router.post('/', issuesReportCtrl.store)

router.get('/', issuesReportCtrl.getList)

module.exports = router
