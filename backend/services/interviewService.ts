import { Interview } from '../models';
import { NewInterview } from '../types';
import { getInterviewOrder } from '../util/filtrationHelper';
import { encodeFiles } from '../util/fileHelpers';

const getAll = async (userId: number, order: string | undefined) => {
  const sort = getInterviewOrder(order);

  const interviews = await Interview.findAll({
    where: { userId: userId },
    order: sort,
  });

  return interviews;
};

const getOne = async (id: number, userId: number) => {
  const interview = await Interview.findByPk(id);

  if (interview && interview.userId !== userId) {
    throw new Error('Invalid Permissions');
  }

  return interview;
};

const getAllForJob = async (
  applicationId: number,
  order: string | undefined
) => {
  const sort = getInterviewOrder(order);

  const interviews = await Interview.findAll({
    where: { applicationId: applicationId },
    order: sort,
  });

  return interviews;
};

const addNew = async (obj: NewInterview, userId: number) => {
  const interview = await Interview.create({
    ...obj,
    files: await encodeFiles(obj.files),
    userId: userId,
  });

  return interview;
};

const update = async (id: number, userId: number, obj: NewInterview) => {
  const interview = await getOne(id, userId);

  if (!interview) {
    return null;
  }

  const updatedInterview = await interview.update({
    ...obj,
    files: await encodeFiles(obj.files),
  });

  return updatedInterview;
};

const remove = async (id: number, userId: number) => {
  const interview = await getOne(id, userId);

  if (!interview) {
    return null;
  }

  await interview.destroy();
  return { message: 'Job deleted' };
};

export default { getAll, getOne, getAllForJob, addNew, update, remove };
