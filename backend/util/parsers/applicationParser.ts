import { NewApplication, Status } from '../../types';
import { parseOptionalString, parseString, parseFiles } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewApplication = (obj: any): NewApplication => {
  return {
    positionTitle: parseString(obj.positionTitle, 'Position'),
    company: parseString(obj.company, 'Company'),
    location: parseString(obj.location, 'Location'),
    status: parseStatus(obj.status),
    files: parseFiles(obj.files),
    notes: parseOptionalString(obj.notes, 'Notes'),
  };
};

const parseStatus = (status: unknown): Status => {
  if (!status || !isStatus(status)) {
    throw new Error('Incorrect or missing status');
  }

  return status;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStatus = (string: any): string is Status => {
  return Object.values(Status).includes(string);
};

export default toNewApplication;
