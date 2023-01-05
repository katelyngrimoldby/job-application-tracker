import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue, addJob, updateJob } from '../state';
import { isAxiosError } from 'axios';
import { addNew, editJob } from '../services/jobs';
import { NewJob } from '../types';
import ApplicationForm from '../components/ApplicationForm';
import Error from '../components/Error';

const NewApplication = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

  if (!user) {
    return (
      <main>
        <h2>401 Unauthorized</h2>
      </main>
    );
  }

  const handleAddition = async (submission: NewJob) => {
    try {
      const job = await addNew(user.token, submission);
      dispatch(addJob(job));
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err);
        setError(err.response?.data.error);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

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
      <h2>New Application</h2>
      {error && <Error err={error} />}
      <ApplicationForm
        handleAddition={handleAddition}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default NewApplication;
