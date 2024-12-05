const { Router } = require('express');
const {
  checkIfLoggedIn,
  displayMessages,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', checkIfLoggedIn, displayMessages);
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
