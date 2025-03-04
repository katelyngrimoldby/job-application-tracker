import { Link } from 'react-router-dom';
import { useStateValue } from '../../../state';
import ApplicationCell from './ApplicationCell';
import InterviewCell from './InterviewCell';
import styles from '../../../styles/components/Preview/Mobile.module.css';

const MobilePreview = ({ type }: { type: 'applications' | 'interviews' }) => {
  const [{ applications, interviews }] = useStateValue();

  if (type === 'applications')
    return (
      <div className={styles.wrapper}>
        {applications.length <= 3 ? (
          applications.map((application) => (
            <ApplicationCell
              application={application}
              key={application.id}
            />
          ))
        ) : (
          <>
            <ApplicationCell application={applications[0]} />
            <ApplicationCell application={applications[1]} />
            <ApplicationCell application={applications[2]} />
          </>
        )}
        <Link to='/applications'>View All</Link>
      </div>
    );
  else
    return (
      <div className={styles.wrapper}>
        {interviews.length <= 3 ? (
          interviews.map((interview) => (
            <InterviewCell
              interview={interview}
              key={interview.id}
            />
          ))
        ) : (
          <>
            <InterviewCell interview={interviews[0]} />
            <InterviewCell interview={interviews[1]} />
            <InterviewCell interview={interviews[2]} />
          </>
        )}
        <Link to='/interviews'>View All</Link>
      </div>
    );
};

export default MobilePreview;
