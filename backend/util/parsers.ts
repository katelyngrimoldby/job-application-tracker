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
    jobDescription: parseString(obj.jobDescription, 'Job Description'),
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

export { toNewJob, toNewUser };
