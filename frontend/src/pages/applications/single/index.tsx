import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Application, Interview } from '../../../types';
import { remove as removeApp } from '../../../services/applications';
import { remove as removeInter } from '../../../services/interviews';
import {
  useStateValue,
  removeApplication,
  removeInterview,
} from '../../../state';
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

  const handleDelete = async (interviews: Interview[]) => {
    try {
      const userId = window.localStorage.getItem('id');

      if (!userId) {
        navigate('/');
        return null;
      }

      interviews.forEach(async (interview) => {
        await removeInter(user.token, Number(userId), interview.id);
        dispatch(removeInterview(interview.id));
      });

      await removeApp(user.token, Number(userId), application.id);
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
