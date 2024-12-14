import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import useFind from '../../hooks/useFind';
import ListApplicationItem from './ApplicationItem';
import ListInterviewItem from './InterviewItem';

const List = ({ type }: { type: 'interviews' | 'applications' }) => {
  const [{ user, applications, interviews }] = useStateValue();
  const { findApplicationForInterview } = useFind();

  if (!user) {
    return null;
  }

  if (type === 'interviews') {
    if (interviews.length <= 0)
      return (
        <p>
          You have no interviews. <Link to='/interviews/new'>Add one now.</Link>
        </p>
      );
    return (
      <ul>
        {interviews.map((interview) => (
          <ListInterviewItem
            interview={interview}
            application={findApplicationForInterview(interview.applicationId)}
            key={interview.id}
          />
        ))}
      </ul>
    );
  } else {
    if (applications.length <= 0)
      return (
        <p>
          You have no applications.{' '}
          <Link to='/applications/new'>Add one now.</Link>
        </p>
      );
    return (
      <ul>
        {applications.map((application) => (
          <ListApplicationItem
            application={application}
            key={application.id}
          />
        ))}
      </ul>
    );
  }
};

export default List;
