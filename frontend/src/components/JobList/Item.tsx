import { Job } from '../../types';
import ReadOnlyRichText from '../RichTextEditor/ReadOnly';

const JobListItem = ({ job }: { job: Job }) => {
  const jobDescStringify = job.jobDescription.replaceAll("'", '"');

  return (
    <div>
      <h2>{job.positionTitle}</h2> <span>{job.company}</span>
      <ReadOnlyRichText content={jobDescStringify} />
    </div>
  );
};

export default JobListItem;
