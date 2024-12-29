import { NewApplication, Status } from '../../types';
import { parseOptionalString, parseString, isStatus } from './globalParsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewApplication = (obj: any): NewApplication => {
  return {
    positionTitle: parseString(obj.positionTitle, 'Position'),
    company: parseString(obj.company, 'Company'),
    location: parseString(obj.location, 'Location'),
    status: parseStatus(obj.status),
    notes: parseOptionalString(obj.notes, 'Notes'),
    jobId: parseOptionalString(obj.jobId, 'Job ID'),
  };
};

const parseStatus = (status: unknown): Status => {
  if (!status || !isStatus(status)) {
    throw new Error('Incorrect or missing status');
  }

  return status;
};

export default toNewApplication;
