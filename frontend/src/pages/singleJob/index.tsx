import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../types';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import Custom404 from '../custom404';
import Error from '../../components/Error';
import JobInfo from '../../components/JobInfo';

const SingleJob = ({ job }: { job: Job | null | undefined }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  if (!user) {
    return null;
  }

  if (!job) {
    return <Custom404 />;
  }
  const handleDelete = async () => {
    try {
      const userId = window.localStorage.getItem('id');

      if (!userId) {
        navigate('/');
        return null;
      }

      await deleteJob(user.token, Number(userId), job.id);
      dispatch(removeJob(job.id));
      navigate('/jobs');
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <JobInfo
        job={job}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default SingleJob;
