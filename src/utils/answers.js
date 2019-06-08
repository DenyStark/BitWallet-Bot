const utils = require('./eth');

const answers = (type, params = {}) => ({
  'hello':
      `Hello *${params.username}*. Wellcome to BitWallet bot.`,
  'request-subscribe':
      'Input ETH address to *subscribe*:',
  'request-unsubscribe':
      'Input ETH address to *unsubscribe*:',
  'wrong-address':
      'Wrong address',
  'success':
      'Success',
  'list':
      `*Your subscription list:*

      ${(params.list || []).join('\n')}`,
  'unknown':
      'Unknown command.',
}[type]);

const newTxAnswer = (params) => `
  *New transaction:*

  hash: [${params.tx.hash}](https://ropsten.etherscan.io/tx/${params.tx.hash})

  from: [${params.tx.from}](https://ropsten.etherscan.io/address/${params.tx.from})
  to: [${params.tx.to}](https://ropsten.etherscan.io/address/${params.tx.to})

  value: ${utils.weiToEth(params.tx.value)} Eth
  fee: ${utils.weiToEth(params.tx.fee)} Eth

  date: ${utils.toDate(params.tx.date)}`.replace(/ {2}/g, '');

/*eslint-disable camelcase */
const keyboard = JSON.stringify({
  resize_keyboard: true,
  one_time_keyboard: true,
  keyboard: [['/list'], ['/subscribe', '/unsubscribe']]
});
/*eslint-enable camelcase */

module.exports = {
  answers,
  newTxAnswer,
  keyboard,
};
