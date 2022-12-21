import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';
import userService from '../services/userService';

const userRouter = express.Router();

userRouter.get('/', async (_req, res) => {
  const result = await userService.getAll();

  res.json(result);
});

userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await userService.getOne(Number(id));
  if (result) {
    return res.json(result);
  }
  return res.status(404).end();
});

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'password is required' });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  try {
    const user = await User.create({ username, name, passwordHash });

    return res.json(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default userRouter;
