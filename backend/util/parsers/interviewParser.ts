import { NewInterview } from '../../types';
import { parseOptionalString, parseFiles, isString } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewInterview = (obj: any): NewInterview => {
  return {
    applicationId: parseNumber(obj.applicationId),
    contact: parseOptionalString(obj.contact, 'Contact'),
    time: parseDate(obj.time, 'Time'),
    website: parseOptionalString(obj.website, 'Website'),
    files: parseFiles(obj.files),
    notes: parseOptionalString(obj.notes, 'Notes'),
  };
};

const parseNumber = (num: unknown): number => {
  if (!num || !isNumber(num)) {
    throw new Error('Missing or invalid id');
  }

  return num;
};

const parseDate = (date: unknown, key: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date for ${key}`);
  }

  return date;
};

const isNumber = (num: unknown): num is number => {
  return typeof num == 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

export default toNewInterview;
