const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./Utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const userRouter = require('./Routes/userRoutes');
const errorController = require('./controllers/errorController');
const viewRouter = require('./Routes/viewRotues');
const bookingRouter = require('./Routes/bookingRoutes');

const app = express();
// Implement Cors
app.use(cors());
// Access-Control-Allow-Origin *

// For only sepecific urls
// app.use(cors({
//   origin: 'https://natours.com'
// }))

app.options('*', cors());

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// 1) Middlewares
// Servering static files
app.use(express.static(`${__dirname}/public`));

// Set Security HTTP header
app.use(helmet({ contentSecurityPolicy: false }));

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit Request for the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});

app.use('/api', limiter);

// app.use((req, res, next) => {
//   console.log('hello from middleware 👋');
//   next();
// });

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization again NoSQL query injection
app.use(mongoSanitize());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Data sanitization against XSS
app.use(xss());
app.use(compression());

app.use(globalErrorHandler);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
// 3) Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // res
  //   .status(404)
  //   .json({ status: 'Fail', message: `Can't find ${req.originalUrl}` });
  // next();

  next(new AppError(`Can't find ${req.originalUrl}`));
});

app.use(errorController);

module.exports = app;
