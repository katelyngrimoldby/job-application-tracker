import { Link } from 'react-router-dom';
import styles from '../styles/pages/landing.module.css';

const Landing = () => {
  return (
    <main className={styles.main}>
      <header className={styles.heading}>
        <div className={styles.headingContent}>
          <h1>Job hunting?</h1>
        </div>
      </header>
      <div className={styles.cta}>
        <p className={styles.subtext}>
          Utilize this job tracker to manage your applications&apos; statuses,
          interviews, and even job postings - all in one easy-to-use platform.
        </p>
        <Link
          to='/register'
          className='primary'
        >
          Sign up - It&apos;s Free
        </Link>
      </div>
    </main>
  );
};

export default Landing;
