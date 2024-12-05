const { Router } = require('express');
const { checkIfLoggedIn, checkIfAdmin } = require('../utils/auth');
const { getAdminsOnlyPage } = require('../controllers/adminsOnlyController');

const admninsOnlyRouter = new Router();

admninsOnlyRouter.get('/', checkIfLoggedIn, checkIfAdmin, getAdminsOnlyPage);

module.exports = {
  admninsOnlyRouter,
};
