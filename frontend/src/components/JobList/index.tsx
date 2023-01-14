import { Link, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import useErrorHandler from '../../hooks/useErrorHandler';
import { Job } from '../../types';
import JobListItem from './Item';
import Error from '../Error';
import styles from '../../styles/components/JobList/JobList.module.css';

const JobList = ({ jobs }: { jobs: Job[] }) => {
  const [{ user }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleDelete = async (id: number) => {
    try {
      const userId = window.localStorage.getItem('id');

      if (!userId) {
        navigate('/');
        return null;
      }

      await deleteJob(user.token, Number(userId), id);
      dispatch(removeJob(id));
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
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
