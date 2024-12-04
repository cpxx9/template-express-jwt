const { Router } = require('express');
const {
  displayRegistration,
  postNewUser,
} = require('../controllers/registerController');

const registerRouter = Router();

registerRouter.get('/', displayRegistration);
registerRouter.post('/', postNewUser);

module.exports = {
  registerRouter,
};
