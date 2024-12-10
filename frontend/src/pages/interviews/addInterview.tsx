import { useNavigate } from 'react-router-dom';
import { useStateValue, addInterview } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { addNew } from '../../services/interviews';
import { NewInterview } from '../../types';
import InterviewForm from '../../components/InterviewForm';
import Error from '../../components/Error';

const AddInterview = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleAddition = async (submission: NewInterview) => {
    try {
      const userId = window.localStorage.getItem('id');

      const interview = await addNew(user.token, Number(userId), submission);
      dispatch(addInterview(interview));
      navigate(`/interviews/${interview.id}`);
    } catch (err) {
      if (isAxiosError(err)) handleError(err.response?.data.error);
    }
  };

  return (
    <main>
      <h1>New Interview</h1>
      {error && <Error err={error} />}
      <InterviewForm handleAddition={handleAddition} />
    </main>
  );
};

export default AddInterview;
