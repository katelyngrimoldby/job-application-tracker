import { useStateValue } from '../state';
import ApplicationStatus from '../components/ApplicationStatus';
import Preview from '../components/Preview';
import styles from '../styles/pages/landing.module.css';

const Dashboard = () => {
  const [{ user, applications }] = useStateValue();

  if (!user) return null;

  return (
    <main className={styles.main}>
      <header className={styles.heading}>
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
        <Preview type='interviews' />
      </section>
    </main>
  );
};

export default Dashboard;
