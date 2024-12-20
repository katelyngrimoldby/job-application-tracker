import { Status } from '../../types';
import { isStatus, isString } from './globalParsers';

export const parseFilter = (status: unknown): Status | undefined => {
  if (!status) {
    return undefined;
  }

  if (!isStatus(status)) {
    throw new Error('Incorrect filter');
  }

  return status;
};

export const parseSort = (string: unknown): string | undefined => {
  if (!string) {
    return undefined;
  }

  if (!isString(string)) {
    throw new Error(`Incorrect order parameter`);
  }

  return string;
};
