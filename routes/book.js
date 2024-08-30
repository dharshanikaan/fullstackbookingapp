const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to render the booking form
router.get('/', bookingController.getBookingForm);

// Route to handle form submission
router.post('/book', bookingController.postBooking);

// Route to display all bookings
router.get('/bookings', bookingController.getAllBookings);

module.exports = router;