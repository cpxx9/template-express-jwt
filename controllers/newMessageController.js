const { addToMessagesDb } = require('../models/Messages');

const getNewMessageForm = (req, res) => {
  res.render('new-message');
};

const postNewMessage = async (req, res, next) => {
  try {
    await addToMessagesDb(req.user.user_id, req.body.title, req.body.text);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getNewMessageForm,
  postNewMessage,
};
