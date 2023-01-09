import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../types';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import Custom404 from '../custom404';
import JobInfo from '../../components/JobInfo';

const SingleJob = ({ job }: { job: Job | null | undefined }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

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
      await deleteJob(user.token, job.id);
      dispatch(removeJob(job.id));
      navigate('/jobs');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data);
      }
    }
  };

  return (
    <main>
      {error && <p>{error}</p>}
      <JobInfo
        job={job}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default SingleJob;
