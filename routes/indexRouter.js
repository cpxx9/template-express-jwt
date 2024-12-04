const { Router } = require('express');
const {
  checkIfLoggedIn,
  displayMessages,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', checkIfLoggedIn, displayMessages);

module.exports = {
  indexRouter,
};
