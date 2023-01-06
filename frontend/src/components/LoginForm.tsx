import { useState } from 'react';
import styles from '../styles/components/LoginForm.module.css';

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (authPayload: { username: string; password: string }) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authPayload = {
      username,
      password,
    };

    handleLogin(authPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
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
