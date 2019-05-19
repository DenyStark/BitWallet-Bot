const { answers, keyboard } = require('../utils/answers');

const db = require('../../db');
const eth = require('../utils/eth');

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  sendMessage(conf) {
    this.bot.sendMessage(conf);
  }

  async start(chat) {
    console.info('Start:', JSON.stringify(chat));

    const { id, username, id: chatId } = chat;
    await db.users.add({ username, chatId });

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

  async requestSubscribe(chat) {
    console.info('Request subscribe:', JSON.stringify(chat));

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'subscribe' });

    const text = answers('request-subscribe', {});

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }
  async subscribe(chat, address) {
    console.info('Subscribe:', JSON.stringify(chat), address);

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'start' });

    let text = '';
    if (!eth.isAddress(address)) {
      text = answers('subscribe-wrong', {});
    } else {
      await db.subscriptions.add({ username, address });
      text = answers('subscribe', {});
    }

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
      reply_markup: keyboard,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }

  async requestUnsubscribe(chat) {
    console.info('Request unsubscribe:', JSON.stringify(chat));

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'unsubscribe' });

    const text = answers('request-unsubscribe', {});

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }
  async unsubscribe(chat, address) {
    console.info('Unsubscribe:', JSON.stringify(chat), address);

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'start' });

    let text = '';
    if (!eth.isAddress(address)) {
      text = answers('unsubscribe-wrong', {});
    } else {
      await db.subscriptions.delete({ username, address });
      text = answers('unsubscribe', {});
    }

    /*eslint-disable camelcase */
    const conf = {
      chat_id: id,
      text,
      reply_markup: keyboard,
    };
    /*eslint-enable camelcase */

    this.sendMessage(conf);
  }

  async list(chat) {
    console.info('List:', JSON.stringify(chat));

    const { id, username } = chat;
    const list = await db.subscriptions.get({ username });

    const text = answers('list', { list });

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
