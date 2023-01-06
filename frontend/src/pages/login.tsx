import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userAuth';
import { getAll } from '../services/jobs';
import { useStateValue, setCurrentUser, setJobList } from '../state';
import LoginForm from '../components/LoginForm';
import Error from '../components/Error';
import styles from '../styles/pages/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [, dispatch] = useStateValue();

  const handleSubmit = async (authPayload: {
    username: string;
    password: string;
  }) => {
    try {
      const authResponse = await login(authPayload);
      dispatch(setCurrentUser(authResponse.session));
      window.localStorage.setItem('id', authResponse.id);

      const jobs = await getAll(authResponse.session.token);
      dispatch(setJobList(jobs));

      navigate('/jobs');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.error);
        setTimeout(() => setError(''), 5000);
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
