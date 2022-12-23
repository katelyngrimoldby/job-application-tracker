import ApplicationForm from '../../components/ApplicationForm';
import Custom404 from '../custom404';
import { Job } from '../../types';

const Edit = ({ job }: { job: Job | null | undefined }) => {
  if (!job) {
    return <Custom404 />;
  }
  return <ApplicationForm content={job} />;
};

export default Edit;
