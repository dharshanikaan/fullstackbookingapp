const Booking = require('../models/book');

exports.getBookingForm = (req, res, next) => {
  Booking.findAll()
    .then(bookings => {
      res.render('index', { bookings });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.postBooking = (req, res, next) => {
  const { name, email } = req.body;
  Booking.create({ name, email })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.getEditBooking = (req, res, next) => {
  const bookingId = req.params.id;
  Booking.findByPk(bookingId)
    .then(booking => {
      if (!booking) {
        return res.status(404).send('Booking not found');
      }
      res.render('edit', { booking });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.postEditBooking = (req, res, next) => {
  const bookingId = req.params.id;
  const { name, email } = req.body;
  Booking.findByPk(bookingId)
    .then(booking => {
      if (!booking) {
        return res.status(404).send('Booking not found');
      }
      return booking.update({ name, email });
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.postDeleteBooking = (req, res, next) => {
  const bookingId = req.params.id;
  Booking.destroy({ where: { id: bookingId } })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};