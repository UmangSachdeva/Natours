const mongoose = require('mongoose');
const Tour = require('../Models/toursModel');

const schema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      max: [5, 'Rating should be below 5'],
      min: [1, 'Rating should not be less than 1'],
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    tour: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-name -passwordChangedAt -__v',
  });

  next();
});

schema.statics.calcAverage = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: {
        tour: tourId,
      },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

schema.index({ tour: 1, user: 1 }, { unique: true });

schema.post('save', function () {
  this.constructor.calcAverage(this.tour);
});

schema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

schema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverage(this.r.tour);
});

const Review = mongoose.model('Review', schema);

module.exports = Review;
// POST /tour/22034u23948/reviews
// GET /tour/22034u23948/reviews
// GET /tour/22034u23948/reviews/0284903
