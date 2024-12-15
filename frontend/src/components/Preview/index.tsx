import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import ApplicationCell from './ApplicationCell';
import InterviewCell from './InterviewCell';

const Preview = ({ type }: { type: 'applications' | 'interviews' }) => {
  const [{ applications, interviews }] = useStateValue();

  if (type === 'applications')
    return (
      <div>
        {applications.length <= 3 ? (
          applications.map((application) => (
            <ApplicationCell
              application={application}
              key={application.id}
            />
          ))
        ) : (
          <>
            <ApplicationCell application={applications[-1]} />
            <ApplicationCell application={applications[-2]} />
            <ApplicationCell application={applications[-3]} />
          </>
        )}
        <Link to='/applications'>View All</Link>
      </div>
    );
  else
    return (
      <div>
        {interviews.length <= 3 ? (
          interviews.map((interview) => (
            <InterviewCell
              interview={interview}
              key={interview.id}
            />
          ))
        ) : (
          <>
            <InterviewCell interview={interviews[-1]} />
            <InterviewCell interview={interviews[-2]} />
            <InterviewCell interview={interviews[-3]} />
          </>
        )}
        <Link to='/interviews'>View All</Link>
      </div>
    );
};

export default Preview;
