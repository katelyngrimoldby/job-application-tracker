import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Application } from '../../../types';
import { remove } from '../../../services/applications';
import { useStateValue, removeApplication } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import Error from '../../../components/Error';
import ApplicationInfo from '../../../components/ApplicationInfo';

const ApplicationSingle = ({ application }: { application: Application }) => {
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

      await remove(user.token, Number(userId), application.id);
      dispatch(removeApplication(application.id));
      navigate('/applications');
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <ApplicationInfo
        application={application}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default ApplicationSingle;
