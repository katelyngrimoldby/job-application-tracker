import { Router } from 'express';
import tokenExtractor from '../middleware/tokenExtractor';
import { RequestUserAuth } from '../types';
import authService from '../services/authService';

const authRouter = Router();

authRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const session = await authService.getSession(Number(id));

  if (!session) {
    res.status(404).end();
  }

  res.json(session);
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);

  res.json(result);
});

authRouter.delete(
  '/logout',
  tokenExtractor,
  async (req: RequestUserAuth, res) => {
    if (req.decodedToken) {
      await authService.logout(req.decodedToken.id);

      return res.status(204).end();
    }
    return res.status(401).json({ error: 'Missing authentication' });
  }
);

export default authRouter;
