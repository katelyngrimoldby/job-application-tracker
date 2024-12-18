import express from 'express';
import { RequestUserAuth } from '../types';
import { toNewApplicationFile } from '../util/parsers/fileParser';
import applicationFileService from '../services/applicationFileService';

const applicationFileRouter = express.Router();

applicationFileRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await applicationFileService.getAll(req.decodedToken.id);

  res.json(
    result.map((file) => {
      return { ...file.dataValues };
    })
  );
});

applicationFileRouter.get('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await applicationFileService.getOne(id, req.decodedToken.id);

  if (!result) return res.status(404).end();

  res.json({ ...result.dataValues });
});

applicationFileRouter.post('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newFile = toNewApplicationFile(req.body);

  const result = await applicationFileService.addNew(
    newFile,
    req.decodedToken.id
  );

  res.json({ ...result.dataValues });
});

applicationFileRouter.put('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  const updatedApplication = toNewApplicationFile(req.body);

  const result = await applicationFileService.update(
    id,
    req.decodedToken.id,
    updatedApplication
  );

  if (!result) {
    return res.status(404).end();
  }

  res.json({ ...result.dataValues });
});

applicationFileRouter.delete('/:id', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.params.id);

  const result = await applicationFileService.remove(id, req.decodedToken.id);

  if (!result) {
    return res.status(404).end();
  }

  res.status(204).end();
});

export default applicationFileRouter;
