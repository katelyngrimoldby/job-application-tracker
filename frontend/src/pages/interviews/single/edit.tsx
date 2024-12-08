import { useStateValue } from '../../../state';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { Interview } from '../../../types';
import InterviewForm from '../../../components/InterviewForm';
import Error from '../../../components/Error';

const EditInterview = ({ interview }: { interview: Interview }) => {
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
      <InterviewForm content={interview} />
    </main>
  );
};

export default EditInterview;
