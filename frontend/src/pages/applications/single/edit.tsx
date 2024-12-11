import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, updateApplication } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { edit } from '../../../services/applications';
import { Application, NewApplication } from '../../../types';
import ApplicationForm from '../../../components/ApplicationForm';
import Error from '../../../components/Error';

const EditApplication = ({ application }: { application: Application }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleUpdate = async (submission: NewApplication, id: number) => {
    try {
      const userId = window.localStorage.getItem('id');

      const application = await edit(
        user.token,
        submission,
        Number(userId),
        id
      );
      dispatch(updateApplication(application));
      navigate(`/applications/${application.id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main>
      <h1>Edit Application</h1>
      {error && <Error err={error} />}
      <ApplicationForm
        content={application}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default EditApplication;
