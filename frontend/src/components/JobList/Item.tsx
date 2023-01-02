import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import { Job } from '../../types';
import toggleArrow from '../../assets/menu-down.svg';
import PencilIcon from '../../components/icons/PencilIcon';
import TrashIcon from '../../components/icons/TrashIcon';
import styles from '../../styles/components/JobList/Item.module.css';

const JobListItem = ({ job }: { job: Job }) => {
  const [visible, setVisible] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  const handleDelete = async () => {
    try {
      await deleteJob(user.token, job.id);
      dispatch(removeJob(job.id));
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data);
      }
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <li className={styles.wrapper}>
        <div className={styles.primaryInfo}>
          <b>{job.positionTitle}</b> <span>{job.company}</span>
          <button onClick={() => setVisible(!visible)}>
            <img
              src={toggleArrow}
              alt={visible ? 'Collapse Application' : 'Expand Application'}
              width='24'
              height='24'
              className={visible ? styles.collapseBtn : styles.expandBtn}
            />
          </button>
        </div>
        <div className={visible ? styles.extraVisible : styles.extraInfo}>
          <div>
            <span>{job.location}</span> <span>{job.compensation}</span>
          </div>
          <div>
            <span>Applied on {job.applied.substring(0, 10)}</span>{' '}
            <span>{job.status}</span>
          </div>
          <div>
            <Link
              to={`/jobs/${job.id}`}
              className='primary'
            >
              View Application
            </Link>
            <div className={styles.buttons}>
              <Link
                to={`/jobs/${job.id}/edit`}
                className='secondary'
              >
                <PencilIcon />
              </Link>
              <button
                type='button'
                onClick={handleDelete}
                className='secondary'
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default JobListItem;
