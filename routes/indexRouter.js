const { Router } = require('express');
const { displayHome } = require('../controllers/indexController');
const { checkIfLoggedIn } = require('../utils/auth');
const { usersRouter } = require('./usersRouter');

const indexRouter = Router();

indexRouter.get('/', checkIfLoggedIn, displayHome);
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
