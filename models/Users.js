const db = require('./pool');

module.exports.addToUsersDb = async (
  firstname,
  lastname,
  email,
  hash,
  salt,
  admin = false,
  member = false
) => {
  await db.query(
    'INSERT INTO users (firstname, lastname, email, admin, member, hash, salt) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [firstname, lastname, email, admin, member, hash, salt]
  );
};

module.export.getAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM users');
  return rows;
};

module.exports.getUserById = async (userId) => {
  const { rows } = await db.query(
    'SELECT * FROM messages WHERE message_id = $1',
    [userId]
  );
  return rows[0];
};
