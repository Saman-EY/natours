const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('uncaught EXCEPTION, shutting dow....');
  process.exit(1);
});

dotenv.config({
  path: './config.env'
});

const port = 3000;
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('connection to DB successful'));

const server = app.listen(port, () => {
  console.log('wating for connection');
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('unhandled rejection, shutting dow....');
  server.close(() => {
    process.exit(1);
  });
});
