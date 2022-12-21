import express from 'express';
import userService from '../services/userService';

const userRouter = express.Router();

userRouter.get('/', (_req, res) => {
  const result = userService.getAll();

  res.json(result);
});

userRouter.get('/:id', (req, res) => {
  const id = req.params.id;

  const result = userService.getOne(Number(id));
  if (result) {
    return res.json(result);
  }
  return res.status(404).end();
});

userRouter.post('/', (req, res) => {
  const { username, name, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'password is required' });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
  }

  const result = userService.addNew(username, password, name);

  res.json(result);
});

export default userRouter;
