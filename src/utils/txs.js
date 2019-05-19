const toModel = (txs, timestamp) => {
  const toModelTxs = txs.map(tx => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    fee: tx.gasPrice * tx.gas,
    timestamp
  }));
  return toModelTxs;
};

module.exports = {
  toModel,
};
