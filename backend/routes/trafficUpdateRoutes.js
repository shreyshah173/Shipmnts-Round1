const express = require('express');
const router = express.Router();
const { createTrafficUpdate } = require('../controllers/trafficUpdateController');

router.post('/traffic-updates', createTrafficUpdate);

module.exports = router;
