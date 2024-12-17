import { useStateValue } from '../state';
import ApplicationPie from '../components/ApplicationPie';
import ApplicationStats from '../components/ApplicationStats';
import Preview from '../components/Preview';
import styles from '../styles/pages/dashboard.module.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [{ user, applications, interviews }] = useStateValue();

  if (!user) return null;

  const applicationCount = applications.filter(
    (application) =>
      application.applyDate.toDateString() === new Date().toDateString()
  ).length;

  const data = [
    applications.filter((application) => application.status === 'applied')
      .length,
    applications.filter((application) => application.status === 'assessments')
      .length,
    applications.filter((application) => application.status === 'interviewing')
      .length,
    applications.filter((application) => application.status === 'offered')
      .length,
  ];

  return (
    <main className={styles.main}>
      {applications.length > 0 ? (
        <>
          <section className={styles.statusWrapper}>
            <div className={styles.header}>
              <header>
                <h1>Hello, {user.name}</h1>
                <span>
                  You have applied to {applicationCount} job
                  {applicationCount != 1 ? 's' : null} today!
                </span>
              </header>
              <div className={styles.statsDesktop}>
                <ApplicationStats data={data} />
              </div>
            </div>
            <div className={styles.chartContainer}>
              <ApplicationPie data={data} />
            </div>
            <div className={styles.stats}>
              <ApplicationStats data={data} />
            </div>
          </section>
          <section className={styles.applicationTable}>
            <h2>My Applications</h2>
            <Preview type='applications' />
          </section>
          <section className={styles.noInterviews}>
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
        <>
          <header className={styles.header}>
            <h1>Hello, {user.name}</h1>
            <span>
              You have applied to {applicationCount} job
              {applicationCount != 1 ? 's' : null} today!
            </span>
          </header>
          <section className={styles.noApplications}>
            <h2>Applications</h2>
            <p>
              You don't have any applications.{' '}
              <Link to='/applications/new'>Add one now.</Link>
            </p>
          </section>
        </>
      )}
    </main>
  );
};

export default Dashboard;
