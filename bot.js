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

const processCommand = (chat, command) => {
  switch (command) {
    case '/start': controller.start(chat); break;
    case '/subscribe': controller.requestSubscribe(chat); break;
    case '/list': controller.list(chat); break;
    case '/unsubscribe': controller.requestUnsubscribe(chat); break;
    default: controller.unknown(chat);
  }
};

const processAction = (chat, text, action) => {
  switch (action) {
    case 'start': controller.unknown(chat); break;
    case 'subscribe': controller.subscribe(chat, text); break;
    case 'unsubscribe': controller.unsubscribe(chat, text); break;
    default: controller.unknown(chat);
  }
};

bot.on('message', async(message) => {
  console.info('New message:', JSON.stringify(message));
  const command = messageUtils.detectCommand(message);

  const { chat, text } = message;

  if (command) processCommand(chat, command);
  else {
    const action = await messageUtils.detectAction(message);
    processAction(chat, text, action);
  }
});
