const express = require('express');
const router = express.Router({ mergeParams: true });
const bookingController = require('../controllers/bookingController.js');
const authController = require('../controllers/authController');

router.post(
  '/checkout-session/:tourID',
  authController.protect,
  bookingController.getCheckoutSession
);

router.use(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide')
);

router
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getAllBooking);

router
  .route('/:id')
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking)
  .get(bookingController.getBooking);

module.exports = router;
