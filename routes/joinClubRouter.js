const { Router } = require('express');
const { getJoinClubPage } = require('../controllers/joinClubController');

const joinClubRouter = new Router();

joinClubRouter.get('/', getJoinClubPage);

module.exports = {
  joinClubRouter,
};
