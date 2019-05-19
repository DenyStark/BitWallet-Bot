const { BOT_TOKEN } = process.env;

const Telegram = require('telegram-bot-api');

const messageUtils = require('./src/utils/messages');
const BotController = require('./src/controllers/bot');

const bot = new Telegram({
  token: BOT_TOKEN,
  updates: {
    enabled: true
  }
});

const controller = new BotController(bot);

bot.on('message', (message) => {
  const command = messageUtils.detectCommand(message);

  if (!command) return;

  const { chat } = message;

  switch (command) {
    case '/start': controller.start(chat); break;
    default: controller.unknownСommand(chat);
  }
});
