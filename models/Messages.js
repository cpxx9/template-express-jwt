const db = require('./pool');

module.exports.addToMessagesDb = async (userId, title, text) => {
  await db.query(
    'INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)',
    [userId, title, text]
  );
};

module.exports.getMessageById = async (messageId) => {
  const { rows } = await db.query(
    'SELECT * FROM messages WHERE message_id = $1',
    [messageId]
  );
  return rows[0];
};

module.export.getAllMessages = async () => {
  const { rows } = await db.query('SELECT * FROM messages');
  return rows;
};
