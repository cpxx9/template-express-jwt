const { Router } = require('express');
const passport = require('passport');
const { loginController } = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.get('/', loginController);
loginRouter.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureMessage: true,
  })
);

module.exports = {
  loginRouter,
};
