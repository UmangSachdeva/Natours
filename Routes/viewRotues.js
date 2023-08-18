const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

router.get('/', authController.isLoggedIn, viewController.getOverview);

router.get('/login', authController.isLoggedIn, viewController.login);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

router.get('/me', authController.protect, viewController.getAccount);

// router.get('/my-tours', authController.protect);
// router.get('/my-tours', authController.protect, viewController.getMyTour);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
