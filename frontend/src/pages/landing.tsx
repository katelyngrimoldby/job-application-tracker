import { Link } from 'react-router-dom';
import styles from '../styles/pages/landing.module.css';

const Landing = () => {
  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.header}>Job hunting?</h1>
        <p className={styles.subtext}>
          Utilize this job tracker to manage your applications&apos; statuses,
          interviews, and even job postings - all in one easy-to-use platform.
        </p>
      </header>
      <Link
        to='/register'
        className='primary'
      >
        Sign up - It&apos;s Free
      </Link>
    </main>
  );
};

export default Landing;
