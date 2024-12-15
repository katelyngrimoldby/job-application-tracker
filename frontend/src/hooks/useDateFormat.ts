const useDateFormat = () => {
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

  const getShortDate = (date: Date) => {
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
      default:
        suffix = 'th';
    }

    return `${getMonthStr(date.getMonth(), 'short')} ${date.getDate()}${suffix}`;
  };

  const getLongDate = (date: Date) => {
    return `${getMonthStr(date.getMonth(), 'long')} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDateTime = (date: Date) => {
    return `${getMonthStr(date.getMonth(), 'long')} ${date.getDate()}, ${date.getFullYear()} at ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
  };

  const getDateTimeValue = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${date.getFullYear()}-${formatNumber(month)}-${formatNumber(day)}T${formatNumber(hour)}:${formatNumber(minute)}`;
  };

  return { getShortDate, getLongDate, getDateTime, getDateTimeValue };
};

export default useDateFormat;
