import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, updateInterview } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import useFind from '../../../hooks/useFind';
import useInterviewFileManagement from '../../../hooks/useInterviewFileManagement';
import { BasicFile, Interview, NewInterview } from '../../../types';
import { edit } from '../../../services/interviews';
import InterviewForm from '../../../components/InterviewForm';
import Error from '../../../components/Error';

const EditInterview = ({ interview }: { interview: Interview }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();
  const { findFilesForInterview } = useFind();
  const {
    sortInterviewFiles,
    deleteInterviewFiles,
    addInterviewFiles,
    updateInterviewFiles,
  } = useInterviewFileManagement();

  if (!user) {
    return null;
  }

  const foundFiles = findFilesForInterview(interview.id);

  const handleUpdate = async (
    submission: NewInterview,
    id: number,
    files: BasicFile[]
  ) => {
    try {
      const userId = Number(window.localStorage.getItem('id'));

      const interview = await edit(user.token, submission, userId, id);
      dispatch(updateInterview(interview));

      const { toDelete, toUpdate, toAdd } = sortInterviewFiles(
        foundFiles,
        files
      );

      deleteInterviewFiles(toDelete, user.token, userId);
      updateInterviewFiles(toUpdate, files, user.token, userId, interview.id);
      addInterviewFiles(toAdd, user.token, userId, interview.id);

      navigate(`/interviews/${interview.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main>
      <h1>Edit Interview</h1>
      {error && <Error err={error} />}
      <InterviewForm
        content={interview}
        initFiles={foundFiles}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default EditInterview;
