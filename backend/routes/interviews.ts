import express from 'express';
import { RequestUserAuth } from '../types';
import toNewInterview from '../util/parsers/interviewParser';
import interviewService from '../services/interviewService';
import interviewFileService from '../services/interviewFileService';

const interviewRouter = express.Router();

interviewRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await interviewService.getAll(req.decodedToken.id);

  res.json(
    result.map((interview) => {
      return { ...interview.dataValues };
    })
  );
});

interviewRouter.get('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await interviewService.getOne(id, req.decodedToken.id);

  if (!result) {
    return res.status(404).end();
  }

  res.json({ ...result.dataValues });
});

interviewRouter.get('/:id/files', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const interview = await interviewService.getOne(id, req.decodedToken.id);

  if (!interview) return res.status(404).end();

  const result = await interviewFileService.getAllForInterview(id);

  res.json(
    result.map((file) => {
      return { ...file.dataValues, fileData: file.fileBuff.toString('base64') };
    })
  );
});

interviewRouter.post('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newInterview = toNewInterview(req.body);

  const result = await interviewService.addNew(
    newInterview,
    req.decodedToken.id
  );

  res.json({ ...result.dataValues });
});

interviewRouter.put('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  const updatedInterview = toNewInterview(req.body);

  const result = await interviewService.update(
    id,
    req.decodedToken.id,
    updatedInterview
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({ ...result.dataValues });
});

interviewRouter.delete('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await interviewService.remove(id, req.decodedToken.id);

  if (!result) {
    return res.status(404).end();
  }

  res.status(204).end();
});

export default interviewRouter;
