import { Link } from 'react-router-dom';
import { useStateValue } from '../state';
import Menu from './Menu';
import styles from '../styles/components/Layout.module.css';

const Header = () => {
  const [{ user }] = useStateValue();
  return (
    <header className={styles.header}>
      <Menu />
      {user ? (
        <span>Welcome, {user.name}</span>
      ) : (
        <div className={styles.cta}>
          <Link
            to='/login'
            className='secondary'
          >
            Log In
          </Link>
          <Link
            to='/register'
            className='primary'
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Designed and developed by{' '}
        <a href='https://www.katelyngrimoldby.com/'>Katelyn Grimoldby</a> © 2022
      </p>
      <p>
        <a
          href='/terms-and-conditions.pdf'
          target='_blank'
        >
          Terms and Conditions
        </a>
      </p>
      <p>
        <a
          href='/privacy-policy.pdf'
          target='_blank'
        >
          Privacy Policy
        </a>
      </p>
    </footer>
  );
};

export { Header, Footer };
