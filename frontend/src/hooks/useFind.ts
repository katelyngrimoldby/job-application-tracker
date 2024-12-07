import { Application } from '../types';
import { useMatch } from 'react-router-dom';
import { useStateValue } from '../state';

const useFind = () => {
  const [{ applications, interviews }] = useStateValue();

  const searchApplications = (id: number) => {
    const application = Object.values(applications).find(
      (application) => application.id === id
    );

    if (application) return application;
    return null;
  };

  const searchInterviews = (id: number) => {
    const interview = Object.values(interviews).find(
      (interview) => interview.id === id
    );

    if (interview) return interview;
    return null;
  };

  const findApplication = (path: string) => {
    const matchApplication = useMatch(path);
    const application = matchApplication
      ? searchApplications(Number(matchApplication.params.id))
      : undefined;
    return application;
  };

  const findInterview = (path: string) => {
    const matchInterview = useMatch(path);
    const interview = matchInterview
      ? searchInterviews(Number(matchInterview.params.id))
      : undefined;
    return interview;
  };

  const findApplicationForInterview = (id: Number) => {
    const foundApplication = applications.find(
      (application) => application.id === id
    );

    if (foundApplication) return foundApplication;
    else
      return {
        positionTitle: 'Error',
        company: 'Error',
        location: 'Error',
        status: 'applied',
        applyDate: new Date(),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
        id: 0,
        files: [],
        jobDescription: 'Error',
        userId: 0,
        notes: '',
        jobId: 'Err',
      } as Application;
  };

  const findInterviewsForApplication = (id: Number) => {
    return interviews.filter((interview) => interview.applicationId === id);
  };

  return {
    findApplication,
    findInterview,
    findApplicationForInterview,
    findInterviewsForApplication,
  };
};

export default useFind;
