const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validPassword } = require('../utils/passwordUtils');
const pool = require('../models/pool');

const verifyCallback = async (email, password, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE users.email = $1',
      [email]
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: 'incorrect email address' });
    }

    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      console.log(user);
      return done(null, user);
    }
    return done(null, false, { message: 'incorrect password' });
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [userId]
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
