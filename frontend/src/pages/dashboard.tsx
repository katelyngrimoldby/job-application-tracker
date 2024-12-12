import { useStateValue } from '../state';
import ApplicationStatus from '../components/ApplicationStatus';
import Preview from '../components/Preview';
import styles from '../styles/pages/dashboard.module.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [{ user, applications, interviews }] = useStateValue();

  if (!user) return null;

  return (
    <main className={styles.main}>
      <header>
        <h1>Hello, {user.name}</h1>
        <span>
          You have applied to{' '}
          {
            applications.filter(
              (application) =>
                application.applyDate.toDateString() ===
                new Date().toDateString()
            ).length
          }{' '}
          jobs today!
        </span>
      </header>
      {applications.length > 0 ? (
        <>
          <section>
            <h2>Application Status</h2>
            <ApplicationStatus />
          </section>
          <section>
            <h2>My Applications</h2>
            <Preview type='applications' />
          </section>
          <section>
            <h2>My Interviews</h2>
            {interviews.length > 0 ? (
              <Preview type='interviews' />
            ) : (
              <p>
                You don't have any interviews.{' '}
                <Link to='/interviews/new'>Add one now.</Link>
              </p>
            )}
          </section>
        </>
      ) : (
        <section>
          <h2>Applications</h2>
          <p>
            You don't have any applications.{' '}
            <Link to='/applications/new'>Add one now.</Link>
          </p>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
