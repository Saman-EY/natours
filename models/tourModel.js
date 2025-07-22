const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 3.5
      // select: false,
    },
    slug: String,
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

    secretTour: {
      type: Boolean,
      default: false
    },

    startDates: [Date]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before save() and create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('WILL SAVE DOC');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARES
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
