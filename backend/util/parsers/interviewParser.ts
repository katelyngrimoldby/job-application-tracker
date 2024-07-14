import { NewInterview } from '../../types';
import { parseOptionalString, parseFiles, parseDate } from './globalParsers';

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

const isNumber = (num: unknown): num is number => {
  return typeof num == 'number' || num instanceof Number;
};

export default toNewInterview;
