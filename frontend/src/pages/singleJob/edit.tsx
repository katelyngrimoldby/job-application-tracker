import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue, updateJob } from '../../state';
import { isAxiosError } from 'axios';
import { editJob } from '../../services/jobs';
import ApplicationForm from '../../components/ApplicationForm';
import Custom404 from '../custom404';
import { Job, NewJob } from '../../types';
import Error from '../../components/Error';

const Edit = ({ job }: { job: Job | null | undefined }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

  if (!job) {
    return <Custom404 />;
  }
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  if (!user) {
    return null;
  }

  const handleUpdate = async (submission: NewJob, id: number) => {
    try {
      const job = await editJob(user.token, submission, id);
      dispatch(updateJob(job));
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.error);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <ApplicationForm
        content={job}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default Edit;
