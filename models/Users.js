const db = require('./pool');

module.exports.addToDb = async (
  firstname,
  lastname,
  email,
  hash,
  salt,
  admin = false,
  member = false
) => {
  await db.query(
    'INSERT INTO users (firstname, lastname, email, admin, member, hash, salt) VALUES ($1, $2, $3, $4, $5, $6, $7,)',
    [firstname, lastname, email, admin, member, hash, salt]
  );
};

module.export.getAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
};
