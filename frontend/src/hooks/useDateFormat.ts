const useDateFormat = (date: Date) => {
  const getDate = () => {
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

  const getDateTime = () => {
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

  return { getDate, getDateTime };
};

export default useDateFormat;
