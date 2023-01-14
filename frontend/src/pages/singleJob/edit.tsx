import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue, updateJob } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { editJob } from '../../services/jobs';
import ApplicationForm from '../../components/ApplicationForm';
import Custom404 from '../custom404';
import { Job, NewJob } from '../../types';
import Error from '../../components/Error';

const Edit = ({ job }: { job: Job | null | undefined }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

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
      const userId = window.localStorage.getItem('id');

      const job = await editJob(user.token, submission, Number(userId), id);
      dispatch(updateJob(job));
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
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
