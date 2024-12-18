import { Application, User } from '../models';
import { NewApplication, Status } from '../types';

const getAll = async (userId: number) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Invalid permissions');
  }

  const applications = await user.getApplications();

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

    switch (alteredStatus) {
      case Status.Assessments:
        return { assessmentDate: new Date() };
      case Status.Interviewing:
        return { interviewDate: new Date() };
      case Status.Offered:
        return { offerDate: new Date() };
      case Status.Rejected:
        return { rejectionDate: new Date() };
      default:
        return null;
    }
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
  await application.removeFiles();
  await user.removeApplication(application);
  return { message: 'Application deleted' };
};

export default { getAll, getOne, addNew, update, remove };
