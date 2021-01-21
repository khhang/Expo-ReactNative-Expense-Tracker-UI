export const formatBalance = (balance) => {
  if(!balance) return '$ 0.00';

  const value = parseFloat(balance);
  const formattedNumber = value >= 0 ? `$ ${value.toFixed(2)}` 
  : `-$ ${Math.abs(value).toFixed(2)}`;

  return formattedNumber === '-$ 0.00' ? '$ 0.00' : formattedNumber;
}
