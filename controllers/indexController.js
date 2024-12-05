const { getAllMessages, getUsersName } = require('../models/Messages');

const displayMessages = async (req, res, next) => {
  const messages = getAllMessages();

  res.render('index', {
    messages,
    member: req.user.member,
    getUserName: getUsersName,
  });
};

module.exports = {
  displayMessages,
};
