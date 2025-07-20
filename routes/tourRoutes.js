const express = require('express');

const router = express.Router();
const controllers = require('../controllers/tourControllers');

router
  .route('/top-5-cheap')
  .get(controllers.aliasTopTours, controllers.getAllTours);
router.route('/tour-stats').get(controllers.getTourStats);

router
  .route('/')
  .get(controllers.getAllTours)
  .post(controllers.createTour);

router
  .route('/:id')
  .get(controllers.getSingleTour)
  .patch(controllers.patchTour)
  .delete(controllers.deleteTour);

module.exports = router;
