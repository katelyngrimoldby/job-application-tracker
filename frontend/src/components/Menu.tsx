import { Link } from 'react-router-dom';
import { useStateValue, clearCurrentUser } from '../state';
import { logout } from '../services/userAuth';

const Menu = () => {
  const [{ user }, dispatch] = useStateValue();

  const handleClick = async () => {
    if (user) {
      await logout(user.token);
      dispatch(clearCurrentUser());
      window.localStorage.removeItem('User');
    }
  };

  return (
    <ul>
      <li>
        <Link to='/'>{user ? 'Your applications' : 'Home'}</Link>
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
            <Link to='/new'>New Application</Link>
          </li>
          <li>
            <button
              type='button'
              onClick={handleClick}
            >
              Log out
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Menu;
