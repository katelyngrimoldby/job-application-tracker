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
      <p>Privacy Policy</p>
      <p>Designed and developed by Katelyn Grimoldby © 2022</p>
    </footer>
  );
};

export { Header, Footer };
