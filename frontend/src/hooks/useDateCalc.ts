const useDateCalc = (date: Date) => {
  const diffDays = Math.round((Date.now() - date.getTime()) / 24);

  const diffMonths = Math.round(diffDays / 30);

  const diffWeeks = Math.round(diffDays / 7);

  if (diffMonths != 0) return [diffMonths, 'months'];
  else if (diffWeeks != 0) return [diffWeeks, 'weeks'];
  else if (diffDays != 0) return [diffDays, 'days'];
  else return null;
};

export default useDateCalc;
