const answers = (type, params) => ({
  'start': `Hello ${params.username}. Wellcome to BitWallet bot.`,
  'request-subscribe': 'Input ETH address:',
  'request-unsubscribe': 'Input ETH address:',
  'subscribe-wrong': 'Wrong address',
  'unsubscribe-wrong': 'Wrong address',
  'subscribe': 'Success',
  'unsubscribe': 'Success',
  'list': `Your subscription list: \n ${params.list.join('\n')}`,
  'unknown': 'Unknown command.',
}[type]);

/*eslint-disable camelcase */
const keyboard = JSON.stringify({
  resize_keyboard: true,
  one_time_keyboard: true,
  keyboard: [['/list'], ['/subscribe', '/unsubscribe']]
});
/*eslint-enable camelcase */

module.exports = {
  answers,
  keyboard,
};
