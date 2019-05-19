const db = require('../../db');

const detectCommand = (message) => {
  const { text, entities } = message;

  if (!entities) return null;

  const { offset, length } = entities[0];
  const command = text.substring(offset, length);
  return command;
};

const detectAction = async(message) => {
  const username = message.chat.username;
  const lastAction = await db.users.getLastAction({ username });
  return lastAction;
};

module.exports = {
  detectCommand,
  detectAction,
};
