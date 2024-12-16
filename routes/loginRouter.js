const { Router } = require('express');
const passport = require('passport');
const { loginController } = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.post('/', loginController);

module.exports = {
  loginRouter,
};
