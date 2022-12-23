import { useStateValue } from '../state';
import JobList from '../components/JobList';

const Jobs = () => {
  const [{ jobs }] = useStateValue();
  return (
    <>
      <h2>Jobs</h2>
      <JobList jobs={jobs} />
    </>
  );
};

export default Jobs;
