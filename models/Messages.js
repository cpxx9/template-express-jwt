const db = require('./pool');

module.exports.addToMessagesDb = async (userId, title, text) => {
  await db.query(
    'INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)',
    [userId, title, text]
  );
};

module.export.getAllMessages = async () => {
  const { rows } = await db.query('SELECT * FROM messages');
  return rows;
};
