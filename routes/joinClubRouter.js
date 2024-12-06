const { Router } = require('express');
const {
  getJoinClubPage,
  joinClubPost,
  getJoinClubSuccessPage,
} = require('../controllers/joinClubController');
const { checkIfLoggedIn, checkIfMember } = require('../utils/auth');

const joinClubRouter = new Router();

joinClubRouter.get('/', checkIfLoggedIn, getJoinClubPage);
joinClubRouter.get('/success', checkIfMember, getJoinClubSuccessPage);
joinClubRouter.post('/', joinClubPost);

module.exports = {
  joinClubRouter,
};
