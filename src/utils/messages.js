const detectCommand = (message) => {
  const { text, entities } = message;

  if (!entities) return null;

  const { offset, length } = entities[0];
  const command = text.substring(offset, length);
  return command;
};

module.exports = {
  detectCommand,
};
