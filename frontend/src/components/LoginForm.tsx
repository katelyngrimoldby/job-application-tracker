import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userAuth';
import { getAll } from '../services/jobs';
import { useStateValue, setCurrentUser, setJobList } from '../state';
import Error from './Error';
import styles from '../styles/components/LoginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [, dispatch] = useStateValue();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authPayload = {
      username,
      password,
    };

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
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      {error && <Error err={error} />}
      <input
        type='text'
        placeholder='Username'
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        disabled={!username || !password}
        className='primary'
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
