import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Job } from '../../types';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import Custom404 from '../custom404';
import ReadOnlyRichText from '../../components/RichTextEditor/ReadOnly';
import PencilIcon from '../../components/icons/PencilIcon';
import TrashIcon from '../../components/icons/TrashIcon';
import styles from '../../styles/pages/singleJob.module.css';

const SingleJob = ({ job }: { job: Job | null | undefined }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState('');

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  if (!job) {
    return <Custom404 />;
  }
  const handleDelete = async () => {
    try {
      await deleteJob(user.token, job.id);
      dispatch(removeJob(job.id));
      navigate('/jobs');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data);
      }
    }
  };

  return (
    <main>
      {error && <p>{error}</p>}
      <section className={styles.topInfo}>
        <h2>{job.positionTitle}</h2>
        <h3>{job.company}</h3>
        <p>Applied on {job.applied.substring(0, 10)}</p>
      </section>
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
      <section className={styles.jobDesc}>
        <h4>Job Description</h4>
        <ReadOnlyRichText content={job.jobDescription} />
      </section>
      <div className={styles.buttons}>
        <Link
          to={`/jobs/${job.id}/edit`}
          className='primary'
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
    </main>
  );
};

export default SingleJob;
