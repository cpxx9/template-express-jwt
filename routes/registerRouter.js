const { Router } = require('express');
const { registerController } = require('../controllers/registerController');

const registerRouter = Router();

registerRouter.get('/', registerController);

module.exports = {
  registerRouter,
};
