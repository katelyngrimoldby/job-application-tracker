import { renderHook } from '@testing-library/react';
import useDateFormat from '../../hooks/useDateFormat';

describe('useDateFormat testing', () => {
  const { result } = renderHook(useDateFormat);

  describe('getShortDate testing', () => {
    const { getShortDate } = result.current;
    it('Provides the month shortened to three characters and the date with a suffix', () => {
      const str = getShortDate(new Date(2024, 9, 25));

      expect(str).toBe('Oct. 25th');
    });

    it('Provides -st suffix on all appropriate dates', () => {
      const str1 = getShortDate(new Date(2024, 11, 1));
      const str2 = getShortDate(new Date(2024, 11, 21));
      const str3 = getShortDate(new Date(2024, 11, 31));

      expect(str1).toBe('Dec. 1st');
      expect(str2).toBe('Dec. 21st');
      expect(str3).toBe('Dec. 31st');
    });

    it('Provides -nd suffix on all appropriate dates', () => {
      const str1 = getShortDate(new Date(2024, 11, 2));
      const str2 = getShortDate(new Date(2024, 11, 22));

      expect(str1).toBe('Dec. 2nd');
      expect(str2).toBe('Dec. 22nd');
    });

    it('Provides -rd suffix on all appropriate dates', () => {
      const str1 = getShortDate(new Date(2024, 11, 3));
      const str2 = getShortDate(new Date(2024, 11, 23));

      expect(str1).toBe('Dec. 3rd');
      expect(str2).toBe('Dec. 23rd');
    });
  });

  describe('getLongDate testing', () => {
    const { getLongDate } = result.current;

    it('Provides month  in full', () => {
      const str = getLongDate(new Date(2024, 3, 12));

      expect(str).toBe('April 12, 2024');
    });

    it('Does not add leading 0 to single-digit dates', () => {
      const str = getLongDate(new Date(2023, 6, 9));

      expect(str).toBe('July 9, 2023');
    });
  });

  describe('getTime testing', () => {
    const { getTime } = result.current;

    it('Provides time in 24hr format', () => {
      const str = getTime(new Date(2024, 1, 1, 15, 59));

      expect(str).toBe('15:59');
    });

    it('Does not add leading 0 to single-digit hours', () => {
      const str = getTime(new Date(2024, 1, 1, 1, 59));

      expect(str).toBe('1:59');
    });

    it('Adds leading 0 to single-digit minutes', () => {
      const str = getTime(new Date(2024, 1, 1, 12, 5));

      expect(str).toBe('12:05');
    });
  });

  describe('getDateTime testing', () => {
    const { getLongDate, getTime, getDateTime } = result.current;

    it('Adds an "at" between getLongDate and getTime results', () => {
      const date = new Date(2024, 0, 7, 8, 9);
      const dateStr = getLongDate(date);
      const time = getTime(date);
      const str = getDateTime(date);

      expect(str).toBe(`${dateStr} at ${time}`);
    });
  });

  describe('getDateTimeValue testing', () => {
    const { getDateTimeValue } = result.current;

    it('Formats as a local date/time string', () => {
      const str = getDateTimeValue(new Date(2023, 11, 13, 12, 20));

      expect(str).toBe('2023-12-13T12:20');
    });

    it('Adds leading 0 to single-digit month', () => {
      const str = getDateTimeValue(new Date(2023, 1, 13, 12, 20));

      expect(str).toBe('2023-02-13T12:20');
    });

    it('Adds leading 0 to single-digit date', () => {
      const str = getDateTimeValue(new Date(2023, 11, 3, 12, 20));

      expect(str).toBe('2023-12-03T12:20');
    });

    it('Adds leading 0 to single-digit hour', () => {
      const str = getDateTimeValue(new Date(2023, 11, 13, 2, 20));

      expect(str).toBe('2023-12-13T02:20');
    });

    it('Adds leading 0 to single-digit minute', () => {
      const str = getDateTimeValue(new Date(2023, 11, 13, 12, 2));

      expect(str).toBe('2023-12-13T12:02');
    });
  });
});
