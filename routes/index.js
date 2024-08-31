const express = require('express');
const router = express.Router();
const bookingRoutes = require('./book');

router.use('/', bookingRoutes);

module.exports = router;