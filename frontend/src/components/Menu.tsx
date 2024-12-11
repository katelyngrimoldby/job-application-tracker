import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStateValue, clearCurrentUser } from '../state';
import { logout } from '../services/userAuth';
import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';
import styles from '../styles/components/Menu.module.css';

const Menu = () => {
  const [{ user }, dispatch] = useStateValue();
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark') ? 'dark' : 'light'
  );
  const navigate = useNavigate();

  const handleClick = async () => {
    const userId = window.localStorage.getItem('id');
    if (user && userId) {
      setVisible(false);
      await logout(user.token, Number(userId));
      dispatch(clearCurrentUser());
      window.localStorage.removeItem('id');
      navigate('/');
    }
  };

  useEffect(() => {
    document.getElementById('root')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menuBar}>
      <button
        onClick={() => setVisible(true)}
        className={styles.menuButton}
      >
        Open Menu
      </button>
      <ul className={visible ? styles.navVisible : styles.nav}>
        <button
          onClick={() => setVisible(false)}
          className={styles.closeButton}
        >
          Close Menu
        </button>
        <li>
          <Link
            to='/'
            onClick={() => setVisible(false)}
          >
            Home
          </Link>
        </li>
        {!user && (
          <li>
            <Link
              to='/register'
              onClick={() => setVisible(false)}
            >
              Register
            </Link>
          </li>
        )}
        {user && (
          <>
            <li>
              <Link
                to='/jobs'
                onClick={() => setVisible(false)}
              >
                Your Applications
              </Link>
            </li>
            <li>
              <Link
                to='/jobs/new'
                onClick={() => setVisible(false)}
              >
                New Application
              </Link>
            </li>
            <li>
              <Link
                to='/interviews'
                onClick={() => setVisible(false)}
              >
                Your Interviews
              </Link>
            </li>
            <li>
              <Link
                to='/interviews/new'
                onClick={() => setVisible(false)}
              >
                New Interview
              </Link>
            </li>
            <li>
              <button
                type='button'
                onClick={handleClick}
                className='secondary'
              >
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
      <div
        className={visible ? styles.backdropVisible : styles.backdrop}
        onClick={() => setVisible(false)}
      ></div>
      <button
        type='button'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <img
            src={moonIcon}
            alt='Dark Mode'
            width='36'
            height='36'
          />
        ) : (
          <img
            src={sunIcon}
            alt='Light Mode'
            width='36'
            height='36'
          />
        )}
      </button>
    </nav>
  );
};

export default Menu;
