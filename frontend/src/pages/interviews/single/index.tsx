import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Interview } from '../../../types';
import { remove } from '../../../services/interviews';
import { useStateValue, removeInterview } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import Error from '../../../components/Error';
import InterviewInfo from '../../../components/InterviewInfo';

const InterviewSingle = ({ interview }: { interview: Interview }) => {
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

      await remove(user.token, Number(userId), interview.id);
      dispatch(removeInterview(interview.id));
      navigate('/interviews');
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <InterviewInfo
        interview={interview}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default InterviewSingle;
