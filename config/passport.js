const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const { validPassword } = require('../utils/passwordUtils');

const prisma = new PrismaClient();

const verifyCallback = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return done(null, false, { message: 'incorrect email or password' });
    }

    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    }
    return done(null, false, { message: 'incorrect email or password' });
  } catch (err) {
    return done(err);
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});
