const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validPassword } = require('../utils/passwordUtils');

const verifyCallback = (email, password, done) => {};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((userId, done) => {});
