import { useStateValue } from '../../state';
import InterviewForm from '../../components/InterviewForm';

const NewInterview = () => {
  const [{ user }] = useStateValue();

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>New Interview</h1>
      <InterviewForm />
    </main>
  );
};

export default NewInterview;
