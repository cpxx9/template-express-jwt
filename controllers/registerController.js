const { body, validationResult } = require('express-validator');

const displayRegistration = (req, res) => {
  res.render('register');
};

const nameAlphaErr = 'must only contain letters.';
const nameLengthErr = 'must be between 1 and 25 characters.';
const emailErr = 'Must be a valid email address.';
const passLengthErr = 'must be between 8 and 32 characters.';
const passMatchErr = 'Passwords must match.';

const validateUser = [
  body('firstname')
    .trim()
    .isAlpha()
    .withMessage(`First name ${nameAlphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`First name ${nameLengthErr}`),
  body('lastname')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${nameAlphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`Last name ${nameLengthErr}`),
  body('email').trim().isEmail().withMessage(emailErr),
  body('password')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage(`Password ${passLengthErr}`),
  body('confirmPassword').custom(
    (value, { req }) => value === req.body.password
  ),
];

const postNewUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { errors: errors.array() });
    }
    const { firstname, lastname, email, password } = req.body;
    res.redirect('/login');
  },
];

module.exports = {
  displayRegistration,
  postNewUser,
};
