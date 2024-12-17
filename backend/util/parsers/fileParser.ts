import { NewApplicationFile, NewInterviewFile } from '../../types';
import { parseString, parseNumber } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewApplicationFile = (obj: any): NewApplicationFile => {
  return {
    filename: parseString(obj.filename, 'Filename'),
    fileData: parseString(obj.fileData, 'File data'),
    applicationId: parseNumber(obj.applicationId),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewInterviewFile = (obj: any): NewInterviewFile => {
  return {
    filename: parseString(obj.filename, 'Filename'),
    fileData: parseString(obj.fileData, 'File data'),
    interviewId: parseNumber(obj.interviewId),
  };
};

export { toNewApplicationFile, toNewInterviewFile };
