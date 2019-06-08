const { answers, keyboard } = require('../utils/answers');

const db = require('../../db');
const eth = require('../utils/eth');

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  sendMessage(chatId, text, isKeyboard = false) {
    /*eslint-disable camelcase */
    const conf = {
      chat_id: chatId,
      parse_mode: 'Markdown',
      text,
    };
    if (isKeyboard) conf.reply_markup = keyboard;
    /*eslint-enable camelcase */

    this.bot.sendMessage(conf);
  }

  async start(chat) {
    console.info('Start:', JSON.stringify(chat));

    const { id, username, id: chatId } = chat;
    await db.users.add({ username, chatId });

    const text = answers('hello', { username });
    this.sendMessage(id, text, true);
  }

  async requestSubscribe(chat) {
    console.info('Request subscribe:', JSON.stringify(chat));

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'subscribe' });

    const text = answers('request-subscribe', {});
    this.sendMessage(id, text);
  }
  async subscribe(chat, address) {
    console.info('Subscribe:', JSON.stringify(chat), address);

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'start' });

    let text = '';
    if (!eth.isAddress(address)) {
      text = answers('wrong-address', {});
    } else {
      await db.subscriptions.add({ username, address });
      text = answers('success', {});
    }

    this.sendMessage(id, text, true);
  }

  async requestUnsubscribe(chat) {
    console.info('Request unsubscribe:', JSON.stringify(chat));

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'unsubscribe' });

    const text = answers('request-unsubscribe', {});
    this.sendMessage(id, text);
  }
  async unsubscribe(chat, address) {
    console.info('Unsubscribe:', JSON.stringify(chat), address);

    const { id, username } = chat;
    await db.users.updateLastAction({ username, action: 'start' });

    let text = '';
    if (!eth.isAddress(address)) {
      text = answers('wrong-address', {});
    } else {
      await db.subscriptions.delete({ username, address });
      text = answers('success', {});
    }

    this.sendMessage(id, text, true);
  }

  async list(chat) {
    console.info('List:', JSON.stringify(chat));

    const { id, username } = chat;
    const list = await db.subscriptions.get({ username });

    const text = answers('list', { list });
    this.sendMessage(id, text, true);
  }

  unknown(chat) {
    console.info('Unknown:', JSON.stringify(chat));

    const { id } = chat;
    const text = answers('unknown', {});
    this.sendMessage(id, text, true);
  }
}

module.exports = BotController;
