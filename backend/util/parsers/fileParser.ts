import { NewFile } from '../../types';
import { parseString, isString, isNumber } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewFile = (obj: any): NewFile => {
  return {
    filename: parseString(obj.filename, 'Filename'),
    fileData: parseString(obj.fileData, 'File data'),
    belongsTo: parseBelongsTo(obj.belongsTo),
    applicationId: parseOptionalNumber(obj.applicationId),
    interviewId: parseOptionalNumber(obj.interviewId),
  };
};

const parseBelongsTo = (string: unknown): 'application' | 'interview' => {
  if (!isString(string)) {
    throw new Error('Invalid value for NewFile.belongsTo');
  }

  if (string !== 'application' && string !== 'interview') {
    throw new Error('Invalid value for NewFile.belongsTo');
  }

  return string;
};

const parseOptionalNumber = (num: unknown): number | null => {
  if (num == null || num == undefined) return null;

  if (!isNumber(num)) {
    throw new Error('Invalid foreign key value for NewFile');
  }
  return num;
};

export default toNewFile;
