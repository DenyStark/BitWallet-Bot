module.exports = (request, params) => ({
  'get-chat-id': `
      SELECT chat_id as "id"
      FROM users
      WHERE username = '${params.username}';`,
  'get-last-action': `
      SELECT last_action as "value"
      FROM users
      WHERE username = '${params.username}';`,

  'add': `
      INSERT INTO users (username, chat_id)
      SELECT
        '${params.username}',
        ${params.chatId}
      WHERE NOT EXISTS (
        SELECT user_id
        FROM users
        WHERE username = '${params.username}'
      ) RETURNING user_id as "id";`,

  'update-last-action': `
      UPDATE users
      SET last_action = '${params.action}'
      WHERE username = '${params.username}';`,
}[request]);
