import express, { Response } from 'express';
import { RequestUserAuth } from '../types';
import { toNewJob } from '../util/parsers';
import jobService from '../services/jobService';

const jobRouter = express.Router();

jobRouter.get('/', async (req: RequestUserAuth, res: Response) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await jobService.getAll(req.decodedToken.id);

  res.json(result);
});

jobRouter.get('/:id', async (req: RequestUserAuth, res: Response) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  try {
    const result = await jobService.getOne(Number(id), req.decodedToken?.id);

    if (!result) {
      return res.status(404).end();
    }

    res.json(result);
  } catch (err) {
    res.status(401).json(err);
  }
});

jobRouter.post('/', async (req: RequestUserAuth, res: Response) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const newJob = toNewJob(req.body);
    const result = await jobService.addNew(newJob, req.decodedToken.id);

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

jobRouter.put('/:id', async (req: RequestUserAuth, res: Response) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  try {
    const updatedJob = toNewJob(req.body);
    const result = await jobService.update(
      Number(id),
      req.decodedToken?.id,
      updatedJob
    );

    if (!result) {
      return res.status(404).end();
    }

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

jobRouter.delete('/:id', async (req: RequestUserAuth, res: Response) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  try {
    const result = await jobService.remove(Number(id), req.decodedToken?.id);

    if (!result) {
      return res.status(404).end();
    }

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

export default jobRouter;
