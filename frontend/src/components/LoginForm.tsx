import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userAuth';
import { useStateValue, setCurrentUser } from '../state';

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
      dispatch(setCurrentUser(authResponse));
      window.localStorage.setItem('User', JSON.stringify(authResponse));

      navigate('/');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button disabled={!username || !password}>Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
