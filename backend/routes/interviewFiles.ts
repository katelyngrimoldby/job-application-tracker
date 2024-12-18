import express from 'express';
import { RequestUserAuth } from '../types';
import { toNewInterviewFile } from '../util/parsers/fileParser';
import interviewFileService from '../services/interviewFileService';

const interviewFileRouter = express.Router();

interviewFileRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await interviewFileService.getAll(req.decodedToken.id);

  res.json(
    result.map((file) => {
      return { ...file.dataValues };
    })
  );
});

interviewFileRouter.get('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await interviewFileService.getOne(id, req.decodedToken.id);

  if (!result) return res.status(404).end();

  res.json({ ...result.dataValues });
});

interviewFileRouter.post('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newFile = toNewInterviewFile(req.body);

  const result = await interviewFileService.addNew(
    newFile,
    req.decodedToken.id
  );

  res.json({ ...result.dataValues });
});

interviewFileRouter.put('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  const updatedinterview = toNewInterviewFile(req.body);

  const result = await interviewFileService.update(
    id,
    req.decodedToken.id,
    updatedinterview
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({ ...result.dataValues });
});

interviewFileRouter.delete('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await interviewFileService.remove(id, req.decodedToken.id);

  if (!result) {
    return res.status(404).end();
  }

  res.status(204).end();
});

export default interviewFileRouter;
