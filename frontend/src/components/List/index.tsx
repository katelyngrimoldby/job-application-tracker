import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import useFind from '../../hooks/useFind';
import { Job, Interview } from '../../types';
import ListJobItem from './JobItem';
import ListInterviewItem from './InterviewItem';

const List = ({
  type,
  jobs,
  interviews,
}: {
  type: 'interviews' | 'jobs';
  jobs?: Job[];
  interviews?: Interview[];
}) => {
  const [{ user }] = useStateValue();
  const { findJobForInterview } = useFind();

  if (!user) {
    return null;
  }

  if (type === 'interviews') {
    if (!interviews || interviews.length <= 0) {
      return (
        <div>
          <p>No interviews available</p>
          <Link to='/interviews/new'>Add one now</Link>
        </div>
      );
    }

    return (
      <ul>
        {interviews.map((interview) => (
          <ListInterviewItem
            interview={interview}
            job={findJobForInterview(interview)}
          />
        ))}
      </ul>
    );
  } else {
    if (!jobs || jobs.length <= 0) {
      return (
        <div>
          <p>No applications available</p>
          <Link to='/jobs/new'>Add one now</Link>
        </div>
      );
    }

    return (
      <ul>
        {jobs.map((job) => (
          <ListJobItem job={job} />
        ))}
      </ul>
    );
  }
};

export default List;
