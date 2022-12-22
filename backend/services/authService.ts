import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../util/config';
import { Session, User } from '../models';

const login = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error('invalid username or password');
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };
  if (!SECRET) {
    throw new Error('Missing env variable');
  }
  const token = jwt.sign(userForToken, SECRET ? SECRET : 'secret');

  await Session.create({ token, userId: user.id });

  return {
    token,
    username: user.username,
    name: user.name,
  };
};

const logout = async (id: number) => {
  await Session.destroy({ where: { userId: id } });

  return {
    message: 'Logout Successful',
  };
};

export default { login, logout };
