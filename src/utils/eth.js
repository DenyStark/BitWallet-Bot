const isAddress = (text) => {
  const regEx = /^0x[a-fA-F0-9]{40}$/g;
  return regEx.test(text);
};

const weiToEth = (wei) => (wei / 10 ** 18).toFixed(6);

module.exports = {
  isAddress,
  weiToEth
};
