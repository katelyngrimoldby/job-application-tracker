import { Application } from '../models';
import { NewApplication, Status } from '../types';
import {
  getApplicationFilter,
  getApplicationOrder,
} from '../util/filtrationHelper';
import { encodeFiles } from '../util/fileHelpers';
import { sequelize } from '../util/db';

const getAll = async (
  id: number,
  statusFilter: Status | undefined,
  order: string | undefined
) => {
  const filter = getApplicationFilter(statusFilter);
  const sort = getApplicationOrder(order);

  const jobs = await Application.findAll({
    where: { ...filter, userId: id },
    order: sort,
  });

  return jobs;
};

const getOne = async (id: number, userId: number) => {
  const job = await Application.findByPk(id);

  if (job && job.userId !== userId) {
    throw new Error('Invalid Permissions');
  }

  return job;
};

const addNew = async (obj: NewApplication, id: number) => {
  const job = await Application.create({
    ...obj,
    assessmentDate: '',
    interviewDate: '',
    offerDate: '',
    rejectionDate: '',
    files: await encodeFiles(obj.files),
    userId: id,
  });

  return job;
};

const update = async (id: number, userId: number, obj: NewApplication) => {
  const job = await getOne(id, userId);

  if (!job) {
    return null;
  }

  const addStatusDate = (
    job: Application,
    obj: NewApplication
  ): object | null => {
    let alteredStatus: Status | null = null;

    if (obj.status != job.status) {
      alteredStatus = obj.status;
    }

    switch (alteredStatus) {
      case Status.Assessments:
        return { assessmentDate: sequelize.literal('CURRENT_TIMESTAMP') };
      case Status.Interviewing:
        return { interviewDate: sequelize.literal('CURRENT_TIMESTAMP') };
      case Status.Offered:
        return { offerDate: sequelize.literal('CURRENT_TIMESTAMP') };
      case Status.Rejected:
        return { offerDate: sequelize.literal('CURRENT_TIMESTAMP') };
      default:
        return null;
    }
  };

  const updatedJob = await job.update({
    ...obj,
    files: await encodeFiles(obj.files),
    ...addStatusDate(job, obj),
  });
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
