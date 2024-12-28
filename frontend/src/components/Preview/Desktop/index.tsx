import { Link } from 'react-router-dom';
import { useStateValue } from '../../../state';
import ApplicationCellDesktop from './ApplicationCell';
import InterviewCellDesktop from './InterviewCell';
import styles from '../../../styles/components/Preview/Desktop.module.css';

const DesktopPreview = ({ type }: { type: 'applications' | 'interviews' }) => {
  const [{ applications, interviews }] = useStateValue();

  if (type == 'applications')
    return (
      <table className={styles.wrapper}>
        <thead>
          <tr>
            <th scope='col'>Company</th>
            <th scope='col'>Position</th>
            <th scope='col'>Date</th>
            <th scope='col'>Status</th>
            <th scope='col'>Link</th>
          </tr>
        </thead>
        <tbody>
          {applications.length <= 3 ? (
            applications.map((application) => (
              <ApplicationCellDesktop
                application={application}
                key={application.id}
              />
            ))
          ) : (
            <>
              <ApplicationCellDesktop application={applications[0]} />
              <ApplicationCellDesktop application={applications[1]} />
              <ApplicationCellDesktop application={applications[2]} />
            </>
          )}
          <tr>
            <td
              colSpan={5}
              data-testid='allApplications'
            >
              <Link to='/applications'>View All</Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  else
    return (
      <table className={styles.wrapper}>
        <thead>
          <tr>
            <th scope='col'>Company</th>
            <th scope='col'>Contact</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Link</th>
          </tr>
        </thead>
        <tbody>
          {interviews.length <= 3 ? (
            interviews.map((interview) => (
              <InterviewCellDesktop
                interview={interview}
                key={interview.id}
              />
            ))
          ) : (
            <>
              <InterviewCellDesktop interview={interviews[0]} />
              <InterviewCellDesktop interview={interviews[1]} />
              <InterviewCellDesktop interview={interviews[2]} />
            </>
          )}
          <tr>
            <td
              colSpan={5}
              data-testid='allInterviews'
            >
              <Link to='/interviews'>View All</Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
};

export default DesktopPreview;
