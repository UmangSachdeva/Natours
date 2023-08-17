const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../Models/toursModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Booking = require('../Models/bookingModel');
const Factory = require('../controllers/handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourID);

  // 2) Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourID
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) {
    return next();
  }

  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});

exports.updateBooking = Factory.updateOne(Booking);

exports.deleteBooking = Factory.deleteOne(Booking);

exports.createBooking = Factory.createOne(Booking);

exports.getBooking = Factory.getOne(Booking);

exports.getAllBooking = Factory.getAll(Booking);
