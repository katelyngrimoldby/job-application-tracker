import { ApplicationFile, User, Application } from '../models';
import { NewApplicationFile } from '../types';

const getAll = async (userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const files = await user.getApplicationFiles();

  return files;
};

const getOne = async (id: number, userId: number) => {
  const file = await ApplicationFile.findByPk(id);

  if (file && file.userId != userId) {
    throw new Error('Invalid permissions');
  }

  return file;
};

const getAllForApplication = async (applicationId: number) => {
  const application = await Application.findByPk(applicationId);

  if (!application) {
    throw new Error("Application doesn't exist");
  }

  const files = await application.getFiles();

  return files;
};

const addNew = async (obj: NewApplicationFile, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const application = await Application.findByPk(obj.applicationId);

  if (!application) {
    throw new Error("Application doesn't exist");
  }

  const file = await user.createApplicationFile(obj);
  await application.addFile(file);

  return file;
};

const update = async (id: number, userId: number, obj: NewApplicationFile) => {
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

  await user.removeApplicationFile(id);
  return { message: 'File deleted' };
};

export { getAll, getOne, getAllForApplication, addNew, update, remove };
