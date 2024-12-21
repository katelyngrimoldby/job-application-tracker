import { PathMatch } from 'react-router-dom';
import { Application } from '../types';
import { useStateValue } from '../state';

const useFind = () => {
  const [{ applications, interviews, applicationFiles, interviewFiles }] =
    useStateValue();

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

  const findApplication = (pathMatch: PathMatch<string> | null) => {
    const application = pathMatch
      ? searchApplications(Number(pathMatch.params.id))
      : undefined;
    return application;
  };

  const findInterview = (pathMatch: PathMatch<string> | null) => {
    const interview = pathMatch
      ? searchInterviews(Number(pathMatch.params.id))
      : undefined;
    return interview;
  };

  const findApplicationForInterview = (id: number) => {
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

  const findInterviewsForApplication = (id: number) => {
    return interviews.filter((interview) => interview.applicationId === id);
  };

  const findFilesForApplication = (id: number) => {
    return applicationFiles.filter((file) => file.applicationId === id);
  };

  const findFilesForInterview = (id: number) => {
    return interviewFiles.filter((file) => file.interviewId === id);
  };

  return {
    findApplication,
    findInterview,
    findApplicationForInterview,
    findInterviewsForApplication,
    findFilesForApplication,
    findFilesForInterview,
  };
};

export default useFind;
