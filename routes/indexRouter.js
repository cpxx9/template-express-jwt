const { Router } = require('express');
const { loginRouter } = require('../routes/loginRouter');
const { registerRouter } = require('../routes/registerRouter');
const { displayHome } = require('../controllers/indexController');
const { checkIfLoggedIn } = require('../utils/auth');

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

indexRouter.get('/users/login', loginRouter);
indexRouter.get('/users/register', registerRouter);

module.exports = {
  indexRouter,
};
