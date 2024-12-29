import { Status } from '../../types';

export const parseOptionalString = (text: unknown, key: string): string => {
  if (text == null || text == undefined) {
    return '';
  }

  if (!isString(text)) {
    throw new Error(`Incorrect parameter: ${key}`);
  }

  return text;
};

export const parseString = (string: unknown, key: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing parameter: ${key}`);
  }

  return string;
};

export const parseDate = (date: unknown, key: string): Date => {
  if (!date) {
    throw new Error(`Missing date for ${key}`);
  }

  if (isDate(date)) {
    return date;
  }

  if (!isString(date)) {
    throw new Error(`Invalid date for ${key}`);
  }

  return checkDateString(date, key);
};

export const parseNumber = (num: unknown): number => {
  if (!num || !isNumber(num)) {
    throw new Error('Missing or invalid id');
  }

  return num;
};

const isDate = (date: unknown): date is Date => {
  return date instanceof Date;
};

const checkDateString = (date: string, key: string): Date => {
  const dateObj = new Date(date);

  if (dateObj.toString() == 'Invalid Date') {
    throw new Error(`Invalid date for ${key}`);
  }

  return dateObj;
};

export const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStatus = (string: any): string is Status => {
  return Object.values(Status).includes(string);
};

export const isNumber = (num: unknown): num is number => {
  return typeof num == 'number' || num instanceof Number;
};
