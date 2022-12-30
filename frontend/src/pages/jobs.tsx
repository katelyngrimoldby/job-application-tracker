import { useStateValue } from '../state';
import JobList from '../components/JobList';

const Jobs = () => {
  const [{ jobs }] = useStateValue();
  return (
    <main>
      <h2>Jobs</h2>
      <JobList jobs={jobs} />
    </main>
  );
};

export default Jobs;
