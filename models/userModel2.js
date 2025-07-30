const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minLength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'User must confirm password'],
    validate: {
      // ONLY WORKS FOR SAVE AND CREATE
      validator: function(el) {
        return el === this.password;
      },
      message: 'passwords not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

userSchema.methods.correctPasswrod = async function(condidatePass, userPass) {
  return await bcrypt.compare(condidatePass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
