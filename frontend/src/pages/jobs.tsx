import { useStateValue } from '../state';
import JobList from '../components/JobList';
import FiltrationMenu from '../components/FiltrationMenu';
import styles from '../styles/pages/jobs.module.css';

const Jobs = () => {
  const [{ jobs, user }] = useStateValue();

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  return (
    <main className={styles.main}>
      <FiltrationMenu user={user} />
      <JobList jobs={jobs} />
    </main>
  );
};

export default Jobs;
