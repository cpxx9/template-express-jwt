const { Router } = require('express');
const { displayMessages } = require('../controllers/indexController');

const indexRouter = Router();

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

indexRouter.get('/', checkLoggedIn, displayMessages);
indexRouter.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = {
  indexRouter,
};
