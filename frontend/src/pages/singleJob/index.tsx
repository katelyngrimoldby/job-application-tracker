import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Job } from '../../types';
import { deleteJob } from '../../services/jobs';
import { useStateValue, removeJob } from '../../state';
import Custom404 from '../custom404';
import ReadOnlyRichText from '../../components/RichTextEditor/ReadOnly';

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
    <>
      {error && <p>{error}</p>}
      <h2>{job.positionTitle}</h2>
      <h3>{job.company}</h3>
      <div>
        <p>Location: {job.location}</p> <p>Compensation: {job.compensation}</p>
      </div>
      <div>
        <p>Applied on {job.applied.substring(0, 10)}</p>
        <p>Status: {job.status}</p>
      </div>
      <div>
        <p>
          <b>Interviews:</b>
        </p>
        <ul>
          {job.interviews.map((date) => (
            <li key={date}>{date.substring(0, 10)}</li>
          ))}
        </ul>
      </div>
      <p>
        <b>Job Description</b>
      </p>
      <ReadOnlyRichText content={job.jobDescription} />
      <Link to={`/jobs/${job.id}/edit`}>Edit</Link>
      <button
        type='button'
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
};

export default SingleJob;
