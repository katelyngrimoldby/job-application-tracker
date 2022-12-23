import { Job } from '../../types';
import Custom404 from '../custom404';
import ReadOnlyRichText from '../../components/RichTextEditor/ReadOnly';

const SingleJob = ({ job }: { job: Job | null | undefined }) => {
  if (!job) {
    return <Custom404 />;
  }

  return (
    <>
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
    </>
  );
};

export default SingleJob;
