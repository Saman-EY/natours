const express = require('express');

const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/:id')
  .get(userController.getSingleUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
