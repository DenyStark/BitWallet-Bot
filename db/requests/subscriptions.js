module.exports = (request, params) => ({
  'get-all': `
      SELECT address, array_agg(chat_id) as "chats"
      FROM subscriptions
      JOIN users USING(user_id)
      GROUP BY address;`,

  'add': `
      INSERT INTO subscriptions
      SELECT (
        SELECT user_id
        FROM users
        WHERE username = '${params.username}'
      ), '${params.wallet}'
      ON CONFLICT DO NOTHING;`,

  'delete': `
      DELETE FROM subscriptions
      WHERE
        user_id = (
          SELECT user_id
          FROM users
          WHERE username = '${params.username}'
        ) AND address = '${params.wallet}';`,
}[request]);
