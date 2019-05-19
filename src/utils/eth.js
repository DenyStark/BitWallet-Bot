const isAddress = (text) => {
  const regEx = /^0x[a-fA-F0-9]{40}$/g;
  return regEx.test(text);
};

module.exports = {
  isAddress,
};
