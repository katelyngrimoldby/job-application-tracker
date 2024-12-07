import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import useFind from '../../hooks/useFind';
import { Application, Interview } from '../../types';
import ListApplicationItem from './ApplicationItem';
import ListInterviewItem from './InterviewItem';

const List = ({
  type,
  applications,
  interviews,
}: {
  type: 'interviews' | 'applications';
  applications?: Application[];
  interviews?: Interview[];
}) => {
  const [{ user }] = useStateValue();
  const { findApplicationForInterview } = useFind();

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
            application={findApplicationForInterview(interview.applicationId)}
          />
        ))}
      </ul>
    );
  } else {
    if (!applications || applications.length <= 0) {
      return (
        <div>
          <p>No applications available</p>
          <Link to='/applications/new'>Add one now</Link>
        </div>
      );
    }

    return (
      <ul>
        {applications.map((application) => (
          <ListApplicationItem application={application} />
        ))}
      </ul>
    );
  }
};

export default List;
