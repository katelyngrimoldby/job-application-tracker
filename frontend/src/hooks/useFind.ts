import { Job, Interview } from '../types';
import { useMatch } from 'react-router-dom';
import { useStateValue } from '../state';

const useFind = () => {
  const [{ jobs, interviews }] = useStateValue();

  const searchJobs = (id: number) => {
    const job = Object.values(jobs).find((job) => job.id === id);

    if (job) return job;
    return null;
  };

  const searchInterviews = (id: number) => {
    const interview = Object.values(interviews).find(
      (interview) => interview.id === id
    );

    if (interview) return interview;
    return null;
  };

  const findJob = (path: string) => {
    const matchJob = useMatch(path);
    const job = matchJob ? searchJobs(Number(matchJob.params.id)) : undefined;
    return job;
  };

  const findInterview = (path: string) => {
    const matchInterview = useMatch(path);
    const interview = matchInterview
      ? searchInterviews(Number(matchInterview.params.id))
      : undefined;
    return interview;
  };

  const findJobForInterview = (interview: Interview) => {
    const foundJob = jobs.find((job) => job.id === interview.applicationId);

    if (foundJob) return foundJob;
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
      } as Job;
  };

  return { findJob, findInterview, findJobForInterview };
};

export default useFind;
