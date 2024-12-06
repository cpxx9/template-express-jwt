const { Router } = require('express');
const {
  getJoinClubPage,
  joinClubPost,
} = require('../controllers/joinClubController');
const { checkIfLoggedIn } = require('../utils/auth');

const joinClubRouter = new Router();

joinClubRouter.get('/', checkIfLoggedIn, getJoinClubPage);
joinClubRouter.post('/', joinClubPost);

module.exports = {
  joinClubRouter,
};
