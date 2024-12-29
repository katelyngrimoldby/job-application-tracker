const useDateCalc = (date: Date) => {
  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  const diffMonths = Math.floor(diffDays / 30);

  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMonths != 0) return [diffMonths, 'months'];
  else if (diffWeeks != 0) return [diffWeeks, 'weeks'];
  else if (diffDays != 0) return [diffDays, 'days'];
  else return null;
};

export default useDateCalc;
