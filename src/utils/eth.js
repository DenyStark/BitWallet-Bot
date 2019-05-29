const isAddress = (text) => {
  const regEx = /^0x[a-fA-F0-9]{40}$/g;
  return regEx.test(text);
};

const weiToEth = (wei) => (wei / 10 ** 18).toFixed(6);

const toDate = (timestamp) => {
  const date = new Date();
  date.setTime(timestamp);
  return date;
};

const txsToModel = (txs, timestamp) => {
  const toModelTxs = txs.map(tx => ({
    hash: tx.hash,
    from: tx.from.toLowerCase(),
    to: (tx.to || '').toLowerCase(),
    value: tx.value,
    fee: tx.gasPrice * tx.gas,
    date: toDate(timestamp),
  }));
  return toModelTxs;
};

module.exports = {
  isAddress,
  weiToEth,
  toDate,
  txsToModel,
};
