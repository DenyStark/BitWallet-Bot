const { BOT_TITLE, BOT_USERNAME } = process.env;

require('./src/workers/bot');

console.info(`
  ${BOT_TITLE} bot started.
  @${BOT_USERNAME}
`);
