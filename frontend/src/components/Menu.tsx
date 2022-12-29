import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue, clearCurrentUser } from '../state';
import { logout } from '../services/userAuth';
import menuIcon from '../assets/menu.svg';
import closeIcon from '../assets/close.svg';
import styles from '../styles/components/Menu.module.css';

const Menu = () => {
  const [{ user }, dispatch] = useStateValue();
  const [visible, setVisible] = useState(false);

  const handleClick = async () => {
    if (user) {
      await logout(user.token);
      dispatch(clearCurrentUser());
      window.localStorage.removeItem('User');
    }
  };

  return (
    <div>
      <button
        onClick={() => setVisible(!visible)}
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
          onClick={() => setVisible(!visible)}
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
            <Link to='/'>Home</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to='/login'>Log In</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to='/jobs'>Your Applications</Link>
              </li>
              <li>
                <Link to='/new'>New Application</Link>
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
