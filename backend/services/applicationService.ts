import { Application, User } from '../models';
import { NewApplication, Status } from '../types';
import { getFilter, getOrder } from '../util/filtrationHelper';

const getAll = async (
  userId: number,
  statusFilter: Status | undefined,
  order: string | undefined
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const filter = getFilter(statusFilter);
  const sort = getOrder(order);

  const applications = await user.getApplications({
    where: filter,
    order: sort,
  });

  return applications;
};

const getOne = async (id: number, userId: number) => {
  const application = await Application.findByPk(id);

  if (application && application.userId !== userId) {
    throw new Error('Invalid Permissions');
  }

  return application;
};

const addNew = async (obj: NewApplication, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const application = await user.createApplication(obj);

  return application;
};

const update = async (id: number, userId: number, obj: NewApplication) => {
  const application = await getOne(id, userId);

  if (!application) {
    return null;
  }

  const addStatusDate = (
    application: Application,
    obj: NewApplication
  ): object | null => {
    let alteredStatus: Status | null = null;

    if (obj.status != application.status) {
      alteredStatus = obj.status;
    }

    if (application.assessmentDate)
      return { assessmentDate: application.assessmentDate };
    else if (alteredStatus == ('assessments' as Status))
      return { assessmentDate: new Date() };
    if (application.interviewDate)
      return { interviewDate: application.interviewDate };
    else if (alteredStatus == ('interviewing' as Status))
      return { interviewDate: new Date() };
    if (application.rejectionDate)
      return { rejectionDate: application.rejectionDate };
    else if (alteredStatus == ('rejected' as Status))
      return { rejectionDate: new Date() };
    if (application.offerDate) return { offerDate: application.offerDate };
    else if (alteredStatus == ('offered' as Status))
      return { offerDate: new Date() };

    return null;
  };

  const updatedApplication = await application.update({
    ...obj,
    ...addStatusDate(application, obj),
  });
  return updatedApplication;
};

const remove = async (id: number, userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const application = await getOne(id, userId);

  if (!application) return null;

  await application.removeInterviews();
  await application.removeApplicationFiles();
  await user.removeApplication(application);
  return { message: 'Application deleted' };
};

export default { getAll, getOne, addNew, update, remove };
