const answers = (type, params) => ({
  'start': `Hello ${params.username}. Wellcome to BitWallet bot.`,
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
