import { NewUser } from '../../types';
import { parseString, isString } from './globalParsers';

const toNewUser = (
  username: unknown,
  name: unknown,
  password: unknown
): NewUser => {
  return {
    username: parseString(username, 'Username'),
    name: parseString(name, 'Name'),
    password: parsePassword(password),
  };
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

export default toNewUser;
