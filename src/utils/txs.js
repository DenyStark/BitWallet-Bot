const toModel = (txs, timestamp) => {
  const date = new Date();
  const toModelTxs = txs.map(tx => ({
    hash: tx.hash,
    from: tx.from.toLowerCase(),
    to: (tx.to || '').toLowerCase(),
    value: tx.value,
    fee: tx.gasPrice * tx.gas,
    date: date.setTime(timestamp),
  }));
  return toModelTxs;
};

module.exports = {
  toModel,
};
