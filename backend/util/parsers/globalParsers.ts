import { Status } from '../../types';

export const parseOptionalString = (text: unknown, key: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect parameter: ${key}`);
  }

  if (!text) {
    return '';
  }

  return text;
};

export const parseString = (string: unknown, key: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing parameter: ${key}`);
  }

  return string;
};

const parseFile = (file: unknown, key: string): File => {
  if (!file || !isFile(file)) {
    throw new Error(`Incorrect or missing file: ${key}`);
  }

  return file;
};

export const parseFiles = (files: unknown): File[] => {
  if (!files || !Array.isArray(files)) {
    throw new Error('Missing file array');
  }

  return files.map(
    (file: unknown, key: number): File => parseFile(file, `File #${key + 1}`)
  );
};

export const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStatus = (string: any): string is Status => {
  return Object.values(Status).includes(string);
};

const isFile = (file: unknown): file is File => {
  return file instanceof File;
};
