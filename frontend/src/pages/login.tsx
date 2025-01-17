import { isAxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/userAuth';
import { getAll } from '../services/applications';
import { useStateValue, setCurrentUser, setApplicationList } from '../state';
import useErrorHandler from '../hooks/useErrorHandler';
import LoginForm from '../components/LoginForm';
import Error from '../components/Error';
import styles from '../styles/pages/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, handleError] = useErrorHandler();
  const [, dispatch] = useStateValue();

  const handleSubmit = async (authPayload: {
    username: string;
    password: string;
  }) => {
    try {
      const authResponse = await login(authPayload);
      dispatch(
        setCurrentUser({
          token: authResponse.accessToken,
          name: authResponse.name,
        })
      );
      window.localStorage.setItem('id', authResponse.id.toString());

      const applications = await getAll(
        authResponse.accessToken,
        authResponse.id
      );
      dispatch(setApplicationList(applications));

      navigate('/');
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };
  return (
    <main className={styles.main}>
      <h1>Login</h1>
      {error && <Error err={error} />}
      <LoginForm handleLogin={handleSubmit} />

      <p>
        Don't have an account? <Link to='/register'>Create one now</Link>
      </p>
    </main>
  );
};

export default Login;
