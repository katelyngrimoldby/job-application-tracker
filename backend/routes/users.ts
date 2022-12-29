import express from 'express';
import userService from '../services/userService';
import { toNewUser } from '../util/parsers';

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

  const newUser = toNewUser(username, name, password);
  const user = await userService.addNew(newUser);

  return res.json(user);
});

export default userRouter;
