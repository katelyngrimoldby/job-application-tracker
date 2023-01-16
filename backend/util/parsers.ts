import { NewJob, Status, NewUser } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewJob = (obj: any): NewJob => {
  const newJob: NewJob = {
    positionTitle: parseString(obj.positionTitle, 'Position'),
    company: parseString(obj.company, 'Company'),
    location: parseString(obj.location, 'Location'),
    applied: parseDate(obj.applied, 'Applied Date'),
    compensation: parseString(obj.compensation, 'Compensaton'),
    status: parseStatus(obj.status),
    interviews: parseInterviews(obj.interviews),
    jobDescription: parseOptionalString(obj.jobDescription, 'Job Description'),
    notes: parseOptionalString(obj.notes, 'Notes'),
    contacts: parseContacts(obj.contacts),
  };

  return newJob;
};

const toNewUser = (username: unknown, name: unknown, password: unknown) => {
  const newUser: NewUser = {
    username: parseString(username, 'Username'),
    name: parseString(name, 'Name'),
    password: parsePassword(password),
  };

  return newUser;
};

const parseOptionalString = (text: unknown, key: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect parameter: ${key}`);
  }

  if (!text) {
    return '';
  }

  return text;
};

const parseString = (string: unknown, key: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing parameter: ${key}`);
  }

  return string;
};

const parseDate = (date: unknown, key: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date for ${key}`);
  }

  return date;
};

const parseStatus = (status: unknown): Status => {
  if (!status || !isStatus(status)) {
    throw new Error('Incorrect or missing status');
  }

  return status;
};

const parseInterviews = (arr: unknown): string[] => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error('Missing interview array');
  }

  return arr.map((item: unknown, key: number): string =>
    parseDate(item, `Interview #${key + 1}`)
  );
};

const parseContacts = (
  arr: unknown
): { name: string; email: string; number: string }[] => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error('Missing interview array');
  }

  return arr.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any, key: number): { name: string; email: string; number: string } =>
      parseContact(item.name, item.email, item.number, key)
  );
};

const parseContact = (
  name: string,
  email: string,
  number: string,
  id: number
): { name: string; email: string; number: string } => {
  return {
    name: parseString(name, `Name on contact #${id}`),
    email: parseOptionalString(email, `Email on contact #${id}`),
    number: parseOptionalString(number, `Number on contact #${id}`),
  };
};

const parseFilter = (status: unknown): Status | undefined => {
  if (!status) {
    return undefined;
  }

  if (!isStatus(status)) {
    throw new Error('Incorrect filter');
  }

  return status;
};

const parseSort = (string: unknown): string | undefined => {
  if (!string) {
    return undefined;
  }

  if (!isString(string)) {
    throw new Error(`Incorrect order parameter`);
  }

  return string;
};

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    throw new Error('Missing or invalid password');
  }

  if (password.length < 5) {
    throw new Error('Password must be at least five (5) characters long');
  }

  return password;
};

const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStatus = (string: any): string is Status => {
  return Object.values(Status).includes(string);
};

export { toNewJob, toNewUser, parseFilter, parseSort };
