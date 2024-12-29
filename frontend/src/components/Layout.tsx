import Menu from './Menu';
import styles from '../styles/components/Layout.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Designed and developed by{' '}
        <a href='https://www.katelyngrimoldby.com/'>Katelyn Grimoldby</a> ©
        2024
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
