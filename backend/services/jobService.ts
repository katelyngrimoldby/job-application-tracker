import { Job } from '../models';
import { NewJob, Status } from '../types';
import { getFilter, getOrder } from '../util/filtrationHelper';

const getAll = async (
  id: number,
  statusFilter: Status | undefined,
  order: string | undefined
) => {
  const filter = getFilter(statusFilter);
  const sort = getOrder(order);

  const jobs = await Job.findAll({
    where: { ...filter, userId: id },
    order: sort,
  });

  return jobs;
};

const getOne = async (id: number, userId: number) => {
  const job = await Job.findByPk(id);

  if (job && job.userId !== userId) {
    throw new Error('Invalid Permissions');
  }

  return job;
};

const addNew = async (obj: NewJob, id: number) => {
  const job = await Job.create({ ...obj, userId: id });

  return job;
};

const update = async (id: number, userId: number, obj: NewJob) => {
  const job = await getOne(id, userId);

  if (!job) {
    return null;
  }

  const updatedJob = await job.update(obj);
  return updatedJob;
};

const remove = async (id: number, userId: number) => {
  const job = await getOne(id, userId);

  if (!job) {
    return null;
  }

  await job.destroy();
  return { message: 'Job deleted' };
};

export default { getAll, getOne, addNew, update, remove };
