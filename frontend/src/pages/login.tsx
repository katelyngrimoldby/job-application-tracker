import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userAuth';
import { getAll } from '../services/jobs';
import { useStateValue, setCurrentUser, setJobList } from '../state';
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

      const jobs = await getAll(authResponse.accessToken, authResponse.id);
      dispatch(setJobList(jobs));

      navigate('/jobs');
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };
  return (
    <main className={styles.main}>
      <h2>Login</h2>
      {error && <Error err={error} />}
      <LoginForm handleLogin={handleSubmit} />
    </main>
  );
};

export default Login;
