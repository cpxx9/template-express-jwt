const { body, validationResult } = require('express-validator');
const { makeUserMember } = require('../models/Users');

const validateSecret = [
  body('secretPhrase').trim().matches(/pool/).withMessage('Incorrect secret!'),
];

const getJoinClubPage = (req, res) => {
  res.render('join-club');
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
      res.send('Success');
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getJoinClubPage,
  joinClubPost,
};
