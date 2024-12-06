const { getAllMessages, getUsersName } = require('../models/Messages');

const displayMessages = async (req, res, next) => {
  const messages = await getAllMessages();

  res.render(
    'index',
    {
      messages,
      member: req.user.member,
      getUserName: getUsersName,
    }
    // { async: true }
  );
};

module.exports = {
  displayMessages,
};
