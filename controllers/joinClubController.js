require('dotenv/config');
const { body, validationResult } = require('express-validator');
const { makeUserMember } = require('../models/Users');

const validateSecret = [
  body('secretPhrase')
    .trim()
    .matches(process.env.CLUB_SECRET)
    .withMessage('Incorrect secret!'),
];

const getJoinClubPage = (req, res) => {
  res.render('join-club');
};

const getJoinClubSuccessPage = (req, res) => {
  res.render('join-club-success');
};

const joinClubPost = [
  validateSecret,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('join-club', { errors: errors.array() });
    }

    try {
      await makeUserMember(req.user.user_id);
      res.redirect('/join-club/success');
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getJoinClubPage,
  getJoinClubSuccessPage,
  joinClubPost,
};
