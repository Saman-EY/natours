const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/apiError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json()); // Parses incoming JSON

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, res) => {
//   res.send('hi body');
//   //   res.json({ name: 'saman' });
// });

// app.post("/", (req,res) => {
//     res.status(201).send("dddddddddd")
// })

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getSingleTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find the ${req.originalUrl} in this website :)`
  // });

  // const err = new Error(`can't find the ${req.originalUrl} in this website :)`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(
    new AppError(`can't find the ${req.originalUrl} in this website :)`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
