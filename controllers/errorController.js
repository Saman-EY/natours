const AppError = require('../utils/apiError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // don't leak error to the client
  } else {
    console.error('Error: ', err);

    res.status(500).json({
      status: 'fail',
      message: 'something went very wrong'
    });
  }
};

const handleCastErrorDB = error => {
  const message = `Invalid ${error.path}: ${error.value}. `;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = error => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. please use another one!`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, res);
  }
};
