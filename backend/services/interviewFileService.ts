import { InterviewFile, User, Interview } from '../models';
import { NewInterviewFile } from '../types';

const getAll = async (userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const files = await user.getInterviewFiles();

  return files;
};

const getOne = async (id: number, userId: number) => {
  const file = await InterviewFile.findByPk(id);

  if (file && file.userId != userId) {
    throw new Error('Invalid permissions');
  }

  return file;
};

const getAllForInterview = async (interviewId: number) => {
  const interview = await Interview.findByPk(interviewId);

  if (!interview) {
    throw new Error("Interview doesn't exist");
  }

  const files = await interview.getFiles();

  return files;
};

const addNew = async (obj: NewInterviewFile, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const interview = await Interview.findByPk(obj.interviewId);

  if (!interview) {
    throw new Error("interview doesn't exist");
  }

  const file = await user.createInterviewFile(obj);
  await interview.addFile(file);

  return file;
};

const update = async (id: number, userId: number, obj: NewInterviewFile) => {
  const file = await getOne(id, userId);

  if (!file) return null;

  const updatedFile = await file.update(obj);

  return updatedFile;
};

const remove = async (id: number, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  await user.removeInterviewFile(id);
  return { message: 'File deleted' };
};

export default { getAll, getOne, getAllForInterview, addNew, update, remove };
