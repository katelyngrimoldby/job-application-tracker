import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, addInterview } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import useInterviewFileManagement from '../../hooks/useInterviewFileManagement';
import { addNew } from '../../services/interviews';
import { BasicFile, NewInterview } from '../../types';
import InterviewForm from '../../components/InterviewForm';
import Error from '../../components/Error';

const AddInterview = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();
  const { addInterviewFiles } = useInterviewFileManagement();

  if (!user) {
    return null;
  }

  const handleAddition = async (
    submission: NewInterview,
    files: BasicFile[]
  ) => {
    try {
      const userId = Number(window.localStorage.getItem('id'));

      const interview = await addNew(user.token, userId, submission);
      dispatch(addInterview(interview));

      addInterviewFiles(files, user.token, userId, interview.id);

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
