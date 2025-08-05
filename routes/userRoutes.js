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
router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, authController.updateMe);

router.delete('/deleteMe', authController.protect, authController.deleteMe);

router
  .route('/:id')
  .get(userController.getSingleUser)
  .patch(userController.patchUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    userController.deleteUser
  );

module.exports = router;
