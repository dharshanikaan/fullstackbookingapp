const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Utility function to render with layout
const renderWithLayout = (res, view, locals) => {
  res.render('layout', { body: res.render(view, { ...locals, layout: false }) });
};

// Create a new booking with AJAX
router.post('/add-booking', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const newBooking = await Booking.create({ name, phone, email });
    
    // Send response with the new booking data
    res.json({ success: true, booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    renderWithLayout(res, 'booking', { bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Edit booking
router.get('/edit/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    renderWithLayout(res, 'edit', { booking });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    await Booking.update({ name, phone, email }, {
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Delete booking
router.post('/delete/:id', async (req, res) => {
  try {
    await Booking.destroy({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;