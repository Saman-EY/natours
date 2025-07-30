const jwt = require('jsonwebtoken');
const User = require('../models/userModel2');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/apiError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check email and pass exist
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }

  // 2) is pass correct
  const user = await User.findOne({ email: email }).select('+password');
  // const isCorrect = await user.correctPasswrod(password, user.password);

  if (!(await user.correctPasswrod(password, user.password)) || !user) {
    return next(new AppError('incorrect email or password', 401));
  }

  // 3) send token

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
