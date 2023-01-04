import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../util/config';
import { redis } from '../util/db';
import { User } from '../models';

const getSession = async (
  id: number
): Promise<{ token: string; username: string; name: string } | null> => {
  const session = await redis.get(id.toString());

  if (!session) {
    return null;
  }

  return JSON.parse(session);
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
    id: user.id,
  };
  if (!SECRET) {
    throw new Error('Missing env variable');
  }
  const token = jwt.sign(userForToken, SECRET ? SECRET : 'secret');

  const session = {
    token,
    username: user.username,
    name: user.name,
  };

  await redis.set(user.id.toString(), JSON.stringify(session));

  return { session, id: user.id };
};

const logout = async (id: number) => {
  await redis.del(id.toString());

  return {
    message: 'Logout Successful',
  };
};

export default { login, logout, getSession };
