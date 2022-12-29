import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStateValue, clearCurrentUser } from '../state';
import { logout } from '../services/userAuth';
import menuIcon from '../assets/menu.svg';
import closeIcon from '../assets/close.svg';
import styles from '../styles/components/Menu.module.css';

const Menu = () => {
  const [{ user }, dispatch] = useStateValue();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      setVisible(false);
      await logout(user.token);
      dispatch(clearCurrentUser());
      window.localStorage.removeItem('User');
      navigate('/');
    }
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className={styles.menuButton}
      >
        <img
          src={menuIcon}
          alt='Open menu'
          height='36'
          width='36'
        />
      </button>
      <nav className={visible ? styles.navVisible : styles.nav}>
        <button
          onClick={() => setVisible(false)}
          className={styles.menuButton}
        >
          <img
            src={closeIcon}
            alt='Close menu'
            height='36'
            width='36'
          />
        </button>
        <ul>
          <li>
            <Link
              to='/'
              onClick={() => setVisible(false)}
            >
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link
                  to='/login'
                  onClick={() => setVisible(false)}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
                  onClick={() => setVisible(false)}
                >
                  Register
                </Link>
              </li>
            </>
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
                  to='/new'
                  onClick={() => setVisible(false)}
                >
                  New Application
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
      </nav>
    </div>
  );
};

export default Menu;
