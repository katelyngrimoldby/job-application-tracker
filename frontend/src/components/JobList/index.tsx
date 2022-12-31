import { Job } from '../../types';
import JobListItem from './Item';
import styles from '../../styles/components/JobList/JobList.module.css';

const JobList = ({ jobs }: { jobs: { [id: string]: Job } }) => {
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
