const { BOT_TOKEN } = process.env;

const Telegram = require('telegram-bot-api');

const messageUtils = require('../utils/messages');

const bot = new Telegram({
  token: BOT_TOKEN,
  updates: {
    enabled: true
  }
});

bot.on('message', (message) => {
  const command = messageUtils.detectCommand(message);
  console.log(command);
});
