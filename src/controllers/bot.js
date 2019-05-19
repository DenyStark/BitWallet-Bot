const { answers, keyboard } = require('../utils/answers');

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  sendMessage(conf) {
    this.bot.sendMessage(conf);
  }

  start(chat) {
    console.info('Start:', JSON.stringify(chat));

    const { id, username } = chat;
    const text = answers('start', { username });

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
      reply_markup: keyboard,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }

  unknown(chat) {
    console.info('Unknown:', JSON.stringify(chat));

    const { id } = chat;
    const text = answers('unknown', {});

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
      reply_markup: keyboard,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }
}

module.exports = BotController;
