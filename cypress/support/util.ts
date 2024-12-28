export const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.substring(1);
};

const formatNumber = (number: number) => {
  if (number < 10) return `0${number}`;
  return `${number}`;
};

const getMonthStr = (month: number, format: 'short' | 'long') => {
  switch (month) {
    case 0:
      if (format == 'short') return 'Jan.';
      return 'January';
    case 1:
      if (format == 'short') return 'Feb.';
      return 'February';
    case 2:
      if (format == 'short') return 'Mar.';
      return 'March';
    case 3:
      if (format == 'short') return 'Apr.';
      return 'April';
    case 4:
      if (format == 'short') return 'May';
      return 'May';
    case 5:
      if (format == 'short') return 'Jun.';
      return 'June';
    case 6:
      if (format == 'short') return 'Jul.';
      return 'July';
    case 7:
      if (format == 'short') return 'Aug.';
      return 'August';
    case 8:
      if (format == 'short') return 'Sep.';
      return 'September';
    case 9:
      if (format == 'short') return 'Oct.';
      return 'October';
    case 10:
      if (format == 'short') return 'Nov.';
      return 'November';
    case 11:
      if (format == 'short') return 'Dec.';
      return 'December';
  }
};

export const getShortDate = (date: Date) => {
  let suffix = '';
  switch (date.getDate()) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    case 21:
      suffix = 'st';
      break;
    case 22:
      suffix = 'nd';
      break;
    case 23:
      suffix = 'rd';
      break;
    case 31:
      suffix = 'st';
      break;
    default:
      suffix = 'th';
  }

  return `${getMonthStr(date.getMonth(), 'short')} ${date.getDate()}${suffix}`;
};

export const getLongDate = (date: Date) => {
  return `${getMonthStr(
    date.getMonth(),
    'long'
  )} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getTime = (date: Date) => {
  return `${date.getHours()}:${formatNumber(date.getMinutes())}`;
};

export const getDateTime = (date: Date) => {
  return `${getLongDate(date)} at ${getTime(date)}`;
};
