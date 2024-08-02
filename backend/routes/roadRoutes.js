const express = require('express');
const router = express.Router();
const roadController = require('../controllers/roadController');

router.post('/roads', roadController.createRoad);

router.get('/roads/:id/traffic-condition', roadController.getTrafficCondition);

router.get('/report/traffic', roadController.generateTrafficReport);

router.get('/report/traffic/updates', roadController.analyzeTrafficUpdates);

module.exports = router;
