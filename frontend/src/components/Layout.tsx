import Menu from './Menu';

const Header = () => {
  return (
    <header>
      <Menu />
      <h1>Job Application Tracker</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>Privacy Policy</p>
      <p>Designed and developed Katelyn Grimoldby © 2022</p>
    </footer>
  );
};

export { Header, Footer };
