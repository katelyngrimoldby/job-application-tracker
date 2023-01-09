import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue, addJob } from '../state';
import { isAxiosError } from 'axios';
import { addNew } from '../services/jobs';
import { NewJob } from '../types';
import ApplicationForm from '../components/ApplicationForm';
import Error from '../components/Error';

const NewApplication = () => {
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

  return (
    <main>
      <h2>New Application</h2>
      {error && <Error err={error} />}
      <ApplicationForm handleAddition={handleAddition} />
    </main>
  );
};

export default NewApplication;
