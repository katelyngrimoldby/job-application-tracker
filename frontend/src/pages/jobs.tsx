import { useEffect } from 'react';
import { useStateValue, setJobList } from '../state';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useErrorHandler from '../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { getAll } from '../services/jobs';
import Error from '../components/Error';
import JobList from '../components/JobList';
import FiltrationMenu from '../components/FiltrationMenu';
import styles from '../styles/pages/jobs.module.css';

const Jobs = () => {
  const [{ jobs, user }, dispatch] = useStateValue();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, handleError] = useErrorHandler();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  if (!user) {
    return null;
  }

  const handleChange = async (name: string, value: string) => {
    if (value) {
      searchParams.set(name, value);
      setSearchParams(searchParams);
    } else {
      if (searchParams.get('filter')) {
        searchParams.delete(name);
        setSearchParams(searchParams);
      }
    }
    const params = location.search.toString();

    try {
      const userId = window.localStorage.getItem('id');

      const jobs = await getAll(user.token, Number(userId), params);
      dispatch(setJobList(jobs));
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main className={styles.main}>
      {error && <Error err={error} />}
      <FiltrationMenu handleChange={handleChange} />
      <JobList jobs={jobs} />
    </main>
  );
};

export default Jobs;
