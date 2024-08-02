const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/locations', locationController.createLocation);

module.exports = router;
