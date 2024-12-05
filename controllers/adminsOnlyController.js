const getAdminsOnlyPage = (req, res) => {
  res.render('admins-only');
};

module.exports = {
  getAdminsOnlyPage,
};
