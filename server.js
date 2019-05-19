const { BOT_TITLE, BOT_USERNAME } = process.env;

require('./bot');

console.info(`
  ${BOT_TITLE} bot started.
  @${BOT_USERNAME}
`);
