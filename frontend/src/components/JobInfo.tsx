import { Link } from 'react-router-dom';
import { Job } from '../types';
import ReadOnlyRichText from './RichTextEditor/ReadOnly';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import styles from '../styles/pages/singleJob.module.css';

const JobInfo = ({
  job,
  handleDelete,
}: {
  job: Job;
  handleDelete: () => void;
}) => {
  return (
    <>
      <section className={styles.topInfo}>
        <h2>{job.positionTitle}</h2>
        <h3>{job.company}</h3>
        <p>Applied on {job.applied.substring(0, 10)}</p>
      </section>
      <div className={styles.infoWrapper}>
        <div className={styles.basicInfo}>
          <p>{job.location}</p>
          <p>{job.compensation}</p>
          <p>{job.status}</p>
        </div>
        <section className={styles.interviews}>
          <h4>Interviews:</h4>
          <ul>
            {job.interviews.map((date) => (
              <li key={date}>{date.substring(0, 10)}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className={styles.jobDesc}>
        <h4>Job Description:</h4>
        <ReadOnlyRichText content={job.jobDescription} />
      </section>
      <div className={styles.buttons}>
        <Link
          to={`/jobs/${job.id}/edit`}
          className='primary'
          aria-label='Edit Application'
        >
          <PencilIcon />
        </Link>
        <button
          type='button'
          onClick={handleDelete}
          className='secondary'
          aria-label='Delete Application'
        >
          <TrashIcon />
        </button>
      </div>
    </>
  );
};

export default JobInfo;
