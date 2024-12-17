import { NewInterview } from '../../types';
import { parseOptionalString, parseDate, isNumber } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewInterview = (obj: any): NewInterview => {
  return {
    applicationId: parseNumber(obj.applicationId),
    contact: parseOptionalString(obj.contact, 'Contact'),
    time: parseDate(obj.time, 'Time'),
    website: parseOptionalString(obj.website, 'Website'),
    notes: parseOptionalString(obj.notes, 'Notes'),
  };
};

const parseNumber = (num: unknown): number => {
  if (!num || !isNumber(num)) {
    throw new Error('Missing or invalid id');
  }

  return num;
};

export default toNewInterview;
