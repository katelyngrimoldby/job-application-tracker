import { useNavigate } from 'react-router-dom';
import { useStateValue, addJob } from '../state';
import useErrorHandler from '../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { addNew } from '../services/jobs';
import { NewJob } from '../types';
import ApplicationForm from '../components/ApplicationForm';
import Error from '../components/Error';

const NewApplication = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleAddition = async (submission: NewJob) => {
    try {
      const userId = window.localStorage.getItem('id');

      const job = await addNew(user.token, Number(userId), submission);
      dispatch(addJob(job));
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
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
