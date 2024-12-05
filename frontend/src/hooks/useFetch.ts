import { isAxiosError } from 'axios';
import { getAll as getAllJobs } from '../services/jobs';
import { getAll as getAllInterviews } from '../services/interviews';
import { getSession } from '../services/userAuth';
import {
  useStateValue,
  setCurrentUser,
  setJobList,
  setInterviewList,
} from '../state';
import useErrorHandler from './useErrorHandler';

const useFetch = () => {
  const [{ jobs, user, interviews }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  const fetchData = async (id: number) => {
    try {
      const userAuth = await getSession(id);
      dispatch(
        setCurrentUser({ token: userAuth.accessToken, name: userAuth.name })
      );

      if (location.pathname === '/jobs') {
        const params = location.search.toString();
        const jobs = await getAllJobs(userAuth.accessToken, id, params);
        dispatch(setJobList(jobs));
      } else {
        const jobs = await getAllJobs(userAuth.accessToken, id);
        dispatch(setJobList(jobs));
      }

      if (location.pathname === '/interviews') {
        const params = location.search.toString();
        const interviews = await getAllInterviews(
          userAuth.accessToken,
          id,
          params
        );
        dispatch(setInterviewList(interviews));
      } else {
        const interviews = await getAllInterviews(userAuth.accessToken, id);
        dispatch(setInterviewList(interviews));
      }
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return { jobs, user, interviews, error, fetchData };
};

export default useFetch;
