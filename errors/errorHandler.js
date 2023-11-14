exports.customErrors = (err, req, res, next) => {
  console.log(err);

  // default
  let errorCode = err.errorCode || 500;
  let errorMessage = err.errorMessage || 'Server error. Something went wrong.';

  res.status(errorCode).send({ errorMessage });
  next(err);
};
