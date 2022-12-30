import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import toggleArrow from '../../assets/menu-down.svg';
import styles from '../../styles/components/JobList/Item.module.css';

const JobListItem = ({ job }: { job: Job }) => {
  const [visible, setVisible] = useState(false);

  return (
    <li>
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
        </div>
      </div>
    </li>
  );
};

export default JobListItem;
