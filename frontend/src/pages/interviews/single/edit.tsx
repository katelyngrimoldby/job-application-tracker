import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, updateInterview } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { Interview, NewInterview } from '../../../types';
import { edit } from '../../../services/interviews';
import InterviewForm from '../../../components/InterviewForm';
import Error from '../../../components/Error';

const EditInterview = ({ interview }: { interview: Interview }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleUpdate = async (submission: NewInterview, id: number) => {
    try {
      const userId = window.localStorage.getItem('id');

      const interview = await edit(user.token, submission, Number(userId), id);
      dispatch(updateInterview(interview));
      navigate(`/interviews/${interview.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <InterviewForm
        content={interview}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default EditInterview;
