const Booking = require('../models/book');

exports.getBookingForm = (req, res) => {
  res.render('index');
};

exports.postBooking = async (req, res) => {
  try {
    const { name, email, date, time } = req.body;
    await Booking.create({ name, email, date, time });
    res.redirect('/bookings');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.render('bookings', { bookings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};