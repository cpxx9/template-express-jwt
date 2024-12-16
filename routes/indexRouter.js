const { Router } = require('express');
const { displayHome } = require('../controllers/indexController');
const { checkIfLoggedIn } = require('../utils/auth');
const { usersRouter } = require('./usersRouter');
const passport = require('../config/passport');

const indexRouter = Router();

indexRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  displayHome
);
indexRouter.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

indexRouter.get('/users', usersRouter);

module.exports = {
  indexRouter,
};
