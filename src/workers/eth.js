const { PROVIDER, BLOCK_DELAY } = process.env;

const Web3 = require('web3');

const utils = require('../utils/eth');

const web3 = new Web3(PROVIDER);
const eth = web3.eth;

module.exports = (observer) => {
  eth.subscribe('newBlockHeaders', error => {
    if (error) console.error(error);
  }).on('data', blockHeader => {
    const { number: newBlock } = blockHeader;
    const number = newBlock - BLOCK_DELAY;

    console.info(`Sync ${number} block`);

    eth.getBlock(number, true).then(data => {
      const { transactions, timestamp } = data;
      const txs = utils.txsToModel(transactions, timestamp);
      observer.processNewTxs(txs);
    });
  }).on('error', console.error);
};
