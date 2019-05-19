const answers = require('../utils/answers');

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  sendMessage(conf) {
    this.bot.sendMessage(conf);
  }

  start(chat) {
    const { id } = chat;
    const text = answers.start;

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }

  unknownСommand(chat) {
    const { id } = chat;
    const text = answers.unknown;

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }
}

module.exports = BotController;
