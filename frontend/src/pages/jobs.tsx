import { useStateValue } from '../state';
import JobList from '../components/JobList';

const Jobs = () => {
  const [{ jobs }] = useStateValue();
  return (
    <main>
      <JobList jobs={jobs} />
    </main>
  );
};

export default Jobs;
