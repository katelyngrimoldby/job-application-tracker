import express from 'express';
import { RequestUserAuth } from '../types';
import applicationFileService from '../services/applicationFileService';
import interviewFileService from '../services/interviewFileService';

const fileRouter = express.Router();

fileRouter.get('/', async (req: RequestUserAuth, res) => {
  if (!req.decodedToken?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const applicationFiles = await applicationFileService.getAll(
    req.decodedToken.id
  );
  const interviewFiles = await interviewFileService.getAll(req.decodedToken.id);

  res.json({
    applicationFiles: applicationFiles.map((file) => {
      return {
        ...file.dataValues,
        fileData: file.fileBuff.toString('base64'),
      };
    }),
    interviewFiles: interviewFiles.map((file) => {
      return {
        ...file.dataValues,
        fileData: file.fileBuff.toString('base64'),
      };
    }),
  });
});

export default fileRouter;
