const express = require('express');

const router = express.Router();
const controllers = require('../controllers/userControllers');

router.route('/').get(controllers.getAllUsers).post(controllers.createUser);
router
  .route('/:id')
  .get(controllers.getSingleUser)
  .patch(controllers.patchUser)
  .delete(controllers.deleteUser);

module.exports = router;
