import { Job } from '../../types';
import JobListItem from './Item';

const JobList = ({ jobs }: { jobs: { [id: string]: Job } }) => {
  return (
    <div>
      {Object.values(jobs).map((job) => (
        <JobListItem
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
};

export default JobList;
