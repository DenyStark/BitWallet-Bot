const { answers } = require('../utils/answers');

const db = require('../../db');

class Observer {
  constructor(bot) {
    this.bot = bot;
  }

  sendMessage(chatId, text) {
    /*eslint-disable camelcase */
    const conf = {
      chat_id: chatId,
      parse_mode: 'Markdown',
      text,
    };
    /*eslint-enable camelcase */

    this.bot.sendMessage(conf);
  }

  async processNewTxs(txs) {
    const subscriptions = await db.subscriptions.getAll({});
    const map = new Map();

    for (const row of subscriptions) {
      const { address, chats } = row;
      map.set(address, chats);
    }

    for (const tx of txs) {
      const { to, from } = tx;

      const chatIds = (map.get(to) || []).concat(map.get(from) || []);

      for (const chatId of chatIds) {
        const text = answers('new-tx', { tx });
        this.sendMessage(chatId, text);
      }
    }
  }
}

module.exports = Observer;
