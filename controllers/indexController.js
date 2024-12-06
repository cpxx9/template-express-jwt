const { getAllMessages, getAllMessagesMember } = require('../models/Messages');

const displayMessages = async (req, res, next) => {
  let messages;
  if (req.user.member) {
    messages = await getAllMessagesMember();
  } else {
    messages = await getAllMessages();
  }

  res.render(
    'index',
    {
      messages,
    }
    // { async: true }
  );
};

module.exports = {
  displayMessages,
};
