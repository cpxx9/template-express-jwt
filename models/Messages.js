const db = require('./pool');

module.exports.addToMessagesDb = async (userId, title, text) => {
  await db.query(
    'INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)',
    [userId, title, text]
  );
};

module.exports.getUsersName = async (userId) => {
  const { rows } = await db.query(
    'SELECT users.firstname, users.lastname FROM messages JOIN users ON messages.user_id = users.user_id WHERE users.user_id = $1',
    [userId]
  );
  const firstLast = rows[0];
  const name = `${firstLast.firstname} ${firstLast.lastname}`;
  return name;
};

module.exports.getMessageById = async (messageId) => {
  const { rows } = await db.query(
    'SELECT * FROM messages WHERE message_id = $1',
    [messageId]
  );
  return rows[0];
};

module.exports.getAllMessages = async () => {
  const { rows } = await db.query('SELECT * FROM messages');
  return rows;
};
