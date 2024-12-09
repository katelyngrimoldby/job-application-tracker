const useDateFormat = () => {
  const getShortDate = (date: Date) => {
    let month = '';
    switch (date.getMonth()) {
      case 0:
        month = 'Jan.';
        break;
      case 1:
        month = 'Feb.';
        break;
      case 2:
        month = 'Mar.';
        break;
      case 3:
        month = 'Apr.';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'Jun.';
        break;
      case 6:
        month = 'Jul.';
        break;
      case 7:
        month = 'Aug.';
        break;
      case 8:
        month = 'Sep.';
        break;
      case 9:
        month = 'Oct.';
        break;
      case 10:
        month = 'Nov.';
        break;
      case 11:
        month = 'Dec.';
        break;
    }

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

    return `${month} ${date.getDate()}${suffix}`;
  };

  const getLongDate = (date: Date) => {
    let month = '';
    switch (date.getMonth()) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }

    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDateTime = (date: Date) => {
    let month = '';
    switch (date.getMonth()) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }

    return `${month} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  };

  const getDateTimeValue = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    let monthStr = `${month}`;
    let dayStr = `${day}`;
    let hourStr = `${hour}`;
    let minuteStr = `${minute}`;

    if (month < 10) monthStr = `0${monthStr}`;
    if (day < 10) dayStr = `0${dayStr}`;
    if (hour < 10) hourStr = `0${hourStr}`;
    if (minute < 10) minuteStr = `0${minuteStr}`;

    return `${date.getFullYear()}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
  };

  return { getShortDate, getLongDate, getDateTime, getDateTimeValue };
};

export default useDateFormat;
