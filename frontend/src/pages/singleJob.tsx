import { Job } from '../types';
import Custom404 from './custom404';

const SingleJob = ({ job }: { job: Job | null | undefined }) => {
  if (!job) {
    return <Custom404 />;
  }

  return <h2>{job.positionTitle}</h2>;
};

export default SingleJob;
