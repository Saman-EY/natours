const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({
  path: './config.env'
});

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT ALL DATA
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded!');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

// REMOVE ALL DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data deleted :)');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
