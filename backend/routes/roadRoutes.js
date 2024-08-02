const express = require('express');
const router = express.Router();
const roadController = require('../controllers/roadController');

router.post('/roads',roadController.createRoad);

module.exports = router;
