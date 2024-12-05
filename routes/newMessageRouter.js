const { Router } = require('express');
const {
  getNewMessageForm,
  postNewMessage,
} = require('../controllers/newMessageController');
const { checkIfLoggedIn } = require('../utils/auth');

const newMessageRouter = new Router();

newMessageRouter.get('/', checkIfLoggedIn, getNewMessageForm);
newMessageRouter.post('/', checkIfLoggedIn, postNewMessage);

module.exports = {
  newMessageRouter,
};
