const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create a new booking
router.post('/add', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const newBooking = await Booking.create({ name, phone, email });
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
    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get a specific booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      res.json({ success: true, booking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update a booking
router.put('/edit/:id', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const [updated] = await Booking.update({ name, phone, email }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBooking = await Booking.findByPk(req.params.id);
      res.json({ success: true, booking: updatedBooking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Delete a booking
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Booking.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;