const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
  .then(() => console.log('connection successful'));

app.listen(port, () => {
  console.log('wating for connection');
});
