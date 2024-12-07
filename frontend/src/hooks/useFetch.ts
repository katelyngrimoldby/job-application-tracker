import { isAxiosError } from 'axios';
import { getAll as getAllApplications } from '../services/applications';
import { getAll as getAllInterviews } from '../services/interviews';
import { getSession } from '../services/userAuth';
import {
  useStateValue,
  setCurrentUser,
  setApplicationList,
  setInterviewList,
} from '../state';
import useErrorHandler from './useErrorHandler';

const useFetch = () => {
  const [{ applications, user, interviews }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  const fetchData = async (id: number) => {
    try {
      const userAuth = await getSession(id);
      dispatch(
        setCurrentUser({ token: userAuth.accessToken, name: userAuth.name })
      );

      if (location.pathname === '/applications') {
        const params = location.search.toString();
        const applications = await getAllApplications(
          userAuth.accessToken,
          id,
          params
        );
        dispatch(setApplicationList(applications));
      } else {
        const applications = await getAllApplications(userAuth.accessToken, id);
        dispatch(setApplicationList(applications));
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

  return { applications, user, interviews, error, fetchData };
};

export default useFetch;