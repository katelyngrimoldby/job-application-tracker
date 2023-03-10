import express from 'express';
import { RequestUserAuth } from '../types';
import { toNewJob, parseFilter, parseSort } from '../util/parsers';
import jobService from '../services/jobService';

const jobRouter = express.Router();

jobRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const filter = parseFilter(req.query.filter);
  const sort = parseSort(req.query.sort);

  const result = await jobService.getAll(req.decodedToken.id, filter, sort);

  res.json(
    result.map((job) => {
      return {
        ...job.dataValues,
        contacts: job.contacts.map((e) => JSON.parse(e)),
      };
    })
  );
});

jobRouter.get('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const result = await jobService.getOne(Number(id), req.decodedToken?.id);

  if (!result) {
    return res.status(404).end();
  }

  res.json({
    ...result.dataValues,
    contacts: result.contacts.map((e) => JSON.parse(e)),
  });
});

jobRouter.post('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newJob = toNewJob(req.body);
  const result = await jobService.addNew(newJob, req.decodedToken.id);

  res.json({
    ...result.dataValues,
    contacts: result.contacts.map((e) => JSON.parse(e)),
  });
});

jobRouter.put('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const updatedJob = toNewJob(req.body);
  const result = await jobService.update(
    Number(id),
    req.decodedToken?.id,
    updatedJob
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({
    ...result.dataValues,
    contacts: result.contacts.map((e) => JSON.parse(e)),
  });
});

jobRouter.delete('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const result = await jobService.remove(Number(id), req.decodedToken?.id);

  if (!result) {
    return res.status(404).end();
  }

  res.status(204).end();
});

export default jobRouter;
