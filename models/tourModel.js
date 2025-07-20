const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 3.5,
    // select: false,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price']
  },
  duration: {
    type: Number,
    required: [true, 'must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'must have a max group size']
  },
  difficulty: {
    type: String,
    required: [true, 'must have a difficulty']
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'must have a description']
  },
  description: {
    type: String,
    trim: true
  },

  imageCover: {
    type: String,
    required: [true, 'must have a image cover']
  },

  images: [String],
  createdAt: {
    type: Date,
    default: Date.now() 
  },

  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
