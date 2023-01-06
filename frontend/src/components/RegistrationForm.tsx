import { useState } from 'react';
import styles from '../styles/components/RegistrationForm.module.css';

const RegistrationForm = ({
  handleRegistration,
}: {
  handleRegistration: (newUser: {
    username: string;
    name: string;
    password: string;
  }) => void;
}) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      username,
      name,
      password,
    };

    handleRegistration(newUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
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
