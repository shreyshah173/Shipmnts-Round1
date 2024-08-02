const express = require('express');
const router = express.Router();
const  calculateShortestPath  = require('../controllers/shortestPathController');

router.get('/shortest-path', calculateShortestPath.calculateShortestPath);

module.exports = router;
