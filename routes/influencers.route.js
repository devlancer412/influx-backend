const express = require('express');
const influencersCtrl = require('../controllers/influencers.controller');
const uploadExcel = require('../middlewares/uploadExcel.middleware');

const router = express.Router();

router.post('/', influencersCtrl.store);

router.post('/upload', uploadExcel.single('file'), influencersCtrl.uploadExcel);

router.get('/', influencersCtrl.getList);

router.get('/:id', influencersCtrl.getById);

router.get('/test', influencersCtrl.test);

module.exports = router;
