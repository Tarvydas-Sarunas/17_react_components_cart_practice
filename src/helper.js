export const makePrice = (value, currency = '€') => {
  //
  return `${value.toFixed(2)} ${currency}`;
};
