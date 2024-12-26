import { NewApplicationFile, NewInterviewFile } from '../../types';
import { parseString, parseNumber, isString } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewApplicationFile = (obj: any): NewApplicationFile => {
  return {
    filename: parseString(obj.filename, 'Filename'),
    fileData: parseBuffer(obj.fileData),
    applicationId: parseNumber(obj.applicationId),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewInterviewFile = (obj: any): NewInterviewFile => {
  return {
    filename: parseString(obj.filename, 'Filename'),
    fileData: parseBuffer(obj.fileData),
    interviewId: parseNumber(obj.interviewId),
  };
};

const parseBuffer = (data: unknown): Buffer<ArrayBuffer> => {
  if (!data || !isString(data)) {
    throw new Error('Invalid format for file data');
  }

  return Buffer.from(data, 'base64');
};

export { toNewApplicationFile, toNewInterviewFile };
