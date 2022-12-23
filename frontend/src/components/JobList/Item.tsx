import { Link } from 'react-router-dom';
import { Job } from '../../types';

const JobListItem = ({ job }: { job: Job }) => {
  return (
    <div>
      <h2>{job.positionTitle}</h2>
      <div>
        <span>{job.company}</span> <span>{job.status}</span>
      </div>
      <Link to={`/jobs/${job.id}`}>View Application</Link>
    </div>
  );
};

export default JobListItem;
