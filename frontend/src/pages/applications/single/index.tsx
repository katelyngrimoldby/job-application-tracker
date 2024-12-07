import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../../types';
import { deleteJob } from '../../../services/applications';
import { useStateValue, removeJob } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import Error from '../../../components/Error';
import JobInfo from '../../../components/ApplicationInfo';

const SingleJob = ({ job }: { job: Job }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
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
