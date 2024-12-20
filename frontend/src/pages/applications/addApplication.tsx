import { useNavigate } from 'react-router-dom';
import { useStateValue, addApplication } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { addNew } from '../../services/applications';
import { BasicFile, NewApplication } from '../../types';
import ApplicationForm from '../../components/ApplicationForm';
import Error from '../../components/Error';
import useApplicationFileManagement from '../../hooks/useApplicationFileManagement';

const AddApplication = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();
  const { addApplicationFiles } = useApplicationFileManagement();

  if (!user) {
    return null;
  }

  const handleAddition = async (
    submission: NewApplication,
    files: BasicFile[]
  ) => {
    try {
      const userId = Number(window.localStorage.getItem('id'));

      const application = await addNew(user.token, userId, submission);
      dispatch(addApplication(application));

      addApplicationFiles(files, user.token, userId, application.id);

      navigate(`/applications/${application.id}`);
    } catch (err) {
      if (isAxiosError(err)) handleError(err.response?.data.error);
    }
  };

  return (
    <main>
      <h1>New Application</h1>
      {error && <Error err={error} />}
      <ApplicationForm handleAddition={handleAddition} />
    </main>
  );
};

export default AddApplication;
