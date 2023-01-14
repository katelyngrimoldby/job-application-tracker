import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../util/config';
import { redis } from '../util/db';
import { User } from '../models';
import { Signature } from '../types';

const getSession = async (id: number): Promise<string | null> => {
  const session = await redis.get(id.toString());

  if (!session) {
    return null;
  }

  const refreshToken = JSON.parse(session);

  if (!SECRET) {
    throw new Error('Missing env variable');
  }

  const decodedToken = jwt.verify(refreshToken, SECRET) as Signature;

  const userForToken = {
    username: decodedToken.username,
    name: decodedToken.name,
    id: decodedToken.id,
  };

  const accessToken = jwt.sign(userForToken, SECRET, { expiresIn: '20m' });

  return accessToken;
};

const login = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error('Invalid username or password');
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user.id,
  };

  if (!SECRET) {
    throw new Error('Missing env variable');
  }

  const accessToken = jwt.sign(userForToken, SECRET, { expiresIn: '20m' });

  const refreshToken = jwt.sign(userForToken, SECRET, { expiresIn: '30 days' });

  await redis.set(user.id.toString(), JSON.stringify(refreshToken));

  return { accessToken, id: user.id };
};

const logout = async (id: number) => {
  await redis.del(id.toString());

  return;
};

export default { login, logout, getSession };
