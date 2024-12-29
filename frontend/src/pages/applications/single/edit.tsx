import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, updateApplication } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import useFind from '../../../hooks/useFind';
import useApplicationFileManagement from '../../../hooks/useApplicationFileManagement';
import { edit } from '../../../services/applications';
import { Application, BasicFile, NewApplication } from '../../../types';
import ApplicationForm from '../../../components/ApplicationForm';
import Error from '../../../components/Error';

const EditApplication = ({ application }: { application: Application }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();
  const { findFilesForApplication } = useFind();
  const {
    sortApplicationFiles,
    deleteApplicationFiles,
    addApplicationFiles,
    updateApplicationFiles,
  } = useApplicationFileManagement();

  if (!user) {
    return null;
  }

  const foundFiles = findFilesForApplication(application.id);

  const handleUpdate = async (
    submission: NewApplication,
    id: number,
    files: BasicFile[]
  ) => {
    try {
      const userId = Number(window.localStorage.getItem('id'));

      const application = await edit(user.token, submission, userId, id);
      dispatch(updateApplication(application));

      const { toDelete, toAdd, toUpdate } = sortApplicationFiles(
        foundFiles,
        files
      );

      deleteApplicationFiles(toDelete, user.token, userId);
      updateApplicationFiles(
        toUpdate,
        files,
        user.token,
        userId,
        application.id
      );
      addApplicationFiles(toAdd, user.token, userId, application.id);

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
        initFiles={foundFiles}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default EditApplication;
