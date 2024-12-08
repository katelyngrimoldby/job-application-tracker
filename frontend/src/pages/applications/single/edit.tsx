import { useStateValue } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import ApplicationForm from '../../../components/ApplicationForm';
import Error from '../../../components/Error';
import { Application } from '../../../types';

const EditApplication = ({ application }: { application: Application }) => {
  // const navigate = useNavigate();
  const [{ user }] = useStateValue();
  const [error] = useErrorHandler();

  if (!user) {
    return null;
  }

  // const handleUpdate = async (submission: NewJob, id: number) => {
  //   try {
  //     const userId = window.localStorage.getItem('id');

  //     const job = await editJob(user.token, submission, Number(userId), id);
  //     dispatch(updateJob(job));
  //     navigate(`/jobs/${job.id}`);
  //   } catch (err) {
  //     if (isAxiosError(err)) {
  //       handleError(err.response?.data.error);
  //     }
  //   }
  // };

  return (
    <main>
      {error && <Error err={error} />}
      <ApplicationForm content={application} />
    </main>
  );
};

export default EditApplication;
