const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      maxlength: [40, "name can't be more than 40 characters"],
      minlength: [10, "name can't be less than 10 characters"],
      // validate: [validator.isAlpha, 'tour name must only contain characters']
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
      required: [true, 'must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either: easy, medium, difficult'
      }
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be below 5.0']
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
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

    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
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

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(next) {
  console.log(`query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
