const { getAllMessages } = require('../models/Messages');

const checkIfLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).render('login');
  }
};

const displayMessages = async (req, res, next) => {
  const messages = getAllMessages();

  res.render('index', { messages });
};

module.exports = {
  checkIfLoggedIn,
  displayMessages,
};
