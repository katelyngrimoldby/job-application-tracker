import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userAuth';
import { isAxiosError } from 'axios';
import Error from './Error';
import styles from '../styles/components/RegistrationForm.module.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      username,
      name,
      password,
    };

    try {
      await register(newUser);
      navigate('/login');
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data.error);
        // setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      {error && <Error err={error} />}
      <div className={styles.inputs}>
        <input
          type='text'
          placeholder='Username'
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className={styles.inputs}>
        <input
          type='password'
          placeholder='Password'
          required
          min={3}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          required
          value={confirmPass}
          onChange={(event) => setConfirmPass(event.target.value)}
        />
      </div>
      <button
        disabled={
          !username ||
          !name ||
          password.length < 3 ||
          !confirmPass ||
          password !== confirmPass
        }
        className='primary'
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
