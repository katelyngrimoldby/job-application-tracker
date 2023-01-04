import { Link } from 'react-router-dom';
import { Job } from '../../types';
import JobListItem from './Item';
import styles from '../../styles/components/JobList/JobList.module.css';

const JobList = ({ jobs }: { jobs: Job[] }) => {
  if (jobs.length <= 0) {
    return (
      <div className={styles.cta}>
        <p>No job applications yet</p>
        <Link
          to='/new'
          className='primary'
        >
          Track a New One
        </Link>
      </div>
    );
  }
  return (
    <ul className={styles.list}>
      {Object.values(jobs).map((job) => (
        <JobListItem
          key={job.id}
          job={job}
        />
      ))}
    </ul>
  );
};

export default JobList;
