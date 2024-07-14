import { Status } from '../../types';

export const parseOptionalString = (text: unknown, key: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect parameter: ${key}`);
  }

  if (!text) {
    return '';
  }

  return text;
};

export const parseString = (string: unknown, key: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing parameter: ${key}`);
  }

  return string;
};

const parseFile = (file: unknown, key: string): string => {
  if (!file || !isString(file)) {
    throw new Error(`Incorrect or missing file: ${key}`);
  } else if (!isFile(file)) {
    throw new Error(`Invalid encoding for file: ${key}`);
  }

  return file;
};

export const parseFiles = (files: unknown): string[] => {
  if (!files || !Array.isArray(files)) {
    throw new Error('Missing file array');
  }

  return files.map((file: unknown, key: number): string =>
    parseFile(file, `File #${key + 1}`)
  );
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

const isFile = (file: string): boolean => {
  return file.startsWith('data:application/pdf;base64,');
};
