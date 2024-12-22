import { Application, Interview, User } from '../models';
import { NewInterview } from '../types';
import applicationService from './applicationService';
import { getInterviewOrder } from '../util/filtrationHelper';

const getAll = async (userId: number, order?: string | undefined) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const sort = getInterviewOrder(order);

  const interviews = await user.getInterviews({ order: sort });

  return interviews;
};

const getOne = async (id: number, userId: number) => {
  const interview = await Interview.findByPk(id);

  if (interview && interview.userId !== userId) {
    throw new Error('Invalid Permissions');
  }

  return interview;
};

const getAllForApplication = async (applicationId: number) => {
  const application = await Application.findByPk(applicationId);

  if (!application) {
    throw new Error("Application doesn't exist");
  }

  const interviews = await application.getInterviews();

  return interviews;
};

const addNew = async (obj: NewInterview, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const application = await applicationService.getOne(
    obj.applicationId,
    userId
  );

  if (!application) {
    throw new Error("Application doesn't exist");
  }

  const interview = await user.createInterview(obj);
  await application.addInterview(interview);

  return interview;
};

const update = async (id: number, userId: number, obj: NewInterview) => {
  const interview = await getOne(id, userId);

  if (!interview) {
    return null;
  }

  const updatedInterview = await interview.update(obj);

  return updatedInterview;
};

const remove = async (id: number, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const interview = await getOne(id, userId);

  if (!interview) return null;

  await interview.removeInterviewFiles();
  await user.removeInterview(interview);
  return { message: 'Interview deleted' };
};

export default { getAll, getOne, getAllForApplication, addNew, update, remove };
