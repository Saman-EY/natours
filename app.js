const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json()); // Parses incoming JSON

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// console.log(
//   process.env.user,
//   process.env.port,
//   process.env.password,
//   process.env.NODE_ENV
// );

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.use('/api/v1/users', userRoutes);

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

module.exports = app;
