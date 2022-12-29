import { useStateValue } from '../state';
import Menu from './Menu';
import styles from '../styles/components/Layout.module.css';

const Header = () => {
  const [{ user }] = useStateValue();
  return (
    <header className={styles.header}>
      <Menu />
      {user && <span>Welcome, {user.name}</span>}
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
