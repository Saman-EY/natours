const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourControllers');
const authController = require('../controllers/authController');

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
