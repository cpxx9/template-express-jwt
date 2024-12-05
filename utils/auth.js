const asyncHandler = require('express-async-handler');
const CustomUnauthorizedError = require('../errors/CustomUnauthorizedError');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const notFound = asyncHandler(async (req, res, next) => {
  throw new CustomNotFoundError('This page does not exist');
});

const checkIfLoggedIn = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new CustomUnauthorizedError(
      'You are not authorized to view this page'
    );
  }
});

module.exports = {
  checkIfLoggedIn,
  notFound,
};
