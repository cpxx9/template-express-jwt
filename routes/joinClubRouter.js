const { Router } = require('express');
const { getJoinClubPage } = require('../controllers/joinClubController');
const { checkIfLoggedIn } = require('../utils/auth');

const joinClubRouter = new Router();

joinClubRouter.get('/', checkIfLoggedIn, getJoinClubPage);

module.exports = {
  joinClubRouter,
};
