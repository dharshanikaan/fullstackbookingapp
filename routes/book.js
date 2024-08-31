const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/book');

// Booking form and list
router.get('/', bookingController.getBookingForm);
router.post('/bookings', bookingController.postBooking);

// Edit booking
router.get('/bookings/edit/:id', bookingController.getEditBooking);
router.post('/bookings/edit/:id', bookingController.postEditBooking);

// Delete booking
router.post('/bookings/delete/:id', bookingController.postDeleteBooking);

module.exports = router;