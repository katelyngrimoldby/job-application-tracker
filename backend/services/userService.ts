import bcrypt from 'bcrypt';
import { User } from '../models';

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
  });

  return users;
};

const getOne = async (id: number) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['passwordHash'] },
  });

  return user;
};

const addNew = async (username: string, password: string, name: string) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  try {
    const user = await User.create({ username, name, passwordHash });

    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('idk what happened');
  }
};

export default { getAll, getOne, addNew };
