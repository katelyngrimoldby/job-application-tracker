import { useStateValue } from '../state';
import JobList from '../components/JobList';
import FiltrationMenu from '../components/FiltrationMenu';

const Jobs = () => {
  const [{ jobs, user }] = useStateValue();

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  return (
    <main style={{ position: 'relative' }}>
      <FiltrationMenu user={user} />
      <JobList jobs={jobs} />
    </main>
  );
};

export default Jobs;
