import bcrypt from 'bcrypt';
import { User } from '../models';
import { NewUser } from '../types';

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

const addNew = async (newUser: NewUser) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const user = await User.create({
    username: newUser.username,
    name: newUser.name,
    passwordHash,
  });

  return user;
};

export default { getAll, getOne, addNew };
