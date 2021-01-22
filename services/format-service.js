export const formatBalance = (balance) => {
  if(!balance) return '$ 0.00';

  const value = parseFloat(balance);
  const formattedNumber = value >= 0 ? `$ ${value.toFixed(2)}` 
  : `-$ ${Math.abs(value).toFixed(2)}`;

  return formattedNumber === '-$ 0.00' ? '$ 0.00' : 
    formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getMonthName = (month) => {
  switch(month){
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
}
