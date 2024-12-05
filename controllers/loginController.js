const loginController = (req, res) => {
  res.render('login', { errors: req.session.messages });
};

module.exports = {
  loginController,
};
