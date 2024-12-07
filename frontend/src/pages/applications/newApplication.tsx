import { useStateValue } from '../../state';
import ApplicationForm from '../../components/ApplicationForm';

const NewApplication = () => {
  const [{ user }] = useStateValue();

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>New Application</h1>
      <ApplicationForm />
    </main>
  );
};

export default NewApplication;
