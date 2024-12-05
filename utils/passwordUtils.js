const crypto = require('bcryptjs');

function validPassword(password, hash, salt) {
  const hashVerify = crypto.hashSync(password, salt);
  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.genSaltSync(10);
  const hash = crypto.hashSync(password, salt);

  return {
    salt,
    hash,
  };
}

module.exports = {
  validPassword,
  genPassword,
};
