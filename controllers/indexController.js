const { getAllMessages } = require('../models/Messages');

const displayMessages = async (req, res, next) => {
  const messages = getAllMessages();

  res.render('index', { messages });
};

module.exports = {
  displayMessages,
};
