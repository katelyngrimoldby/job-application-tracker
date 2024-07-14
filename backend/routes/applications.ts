import express from 'express';
import { RequestUserAuth } from '../types';
import toNewApplication from '../util/parsers/applicationParser';
import { parseFilter, parseSort } from '../util/parsers/queryParsers';
import applicationService from '../services/applicationService';
import interviewService from '../services/interviewService';

const applicationRouter = express.Router();

applicationRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const filter = parseFilter(req.query.filter);
  const sort = parseSort(req.query.sort);

  const result = await applicationService.getAll(
    req.decodedToken.id,
    filter,
    sort
  );

  res.json(
    result.map((application) => {
      return {
        ...application.dataValues,
      };
    })
  );
});

applicationRouter.get('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const result = await applicationService.getOne(
    Number(id),
    req.decodedToken?.id
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({
    ...result.dataValues,
  });
});

applicationRouter.get('/:id/interviews', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const job = await applicationService.getOne(Number(id), req.decodedToken?.id);

  if (!job) {
    return res.status(404).end();
  }

  const result = await interviewService.getAllForApplication(
    Number(id),
    'soonest'
  );

  res.json(
    result.map((interview) => {
      return { ...interview.dataValues };
    })
  );
});

applicationRouter.post('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newApplication = toNewApplication(req.body);
  const result = await applicationService.addNew(
    newApplication,
    req.decodedToken.id
  );

  res.json({
    ...result.dataValues,
  });
});

applicationRouter.put('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const updatedApplication = toNewApplication(req.body);
  const result = await applicationService.update(
    Number(id),
    req.decodedToken?.id,
    updatedApplication
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({
    ...result.dataValues,
  });
});

applicationRouter.delete('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.params.id;

  const result = await applicationService.remove(
    Number(id),
    req.decodedToken?.id
  );

  if (!result) {
    return res.status(404).end();
  }

  res.status(204).end();
});

export default applicationRouter;
