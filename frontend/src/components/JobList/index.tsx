import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import { Job } from '../../types';
import JobListItem from './Item';
import Error from '../Error';
import styles from '../../styles/components/JobList/JobList.module.css';

const JobList = ({ jobs }: { jobs: Job[] }) => {
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(user.token, id);
      dispatch(removeJob(id));
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.error);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

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
      {error && <Error err={error} />}
      {Object.values(jobs).map((job) => (
        <JobListItem
          key={job.id}
          job={job}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default JobList;
