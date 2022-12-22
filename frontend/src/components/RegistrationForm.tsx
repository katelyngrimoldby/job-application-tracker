import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userAuth';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      username,
      name,
      password,
    };

    await register(newUser);

    navigate('/login');
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
        type='text'
        placeholder='Name'
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        required
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
      <button
        disabled={
          !username ||
          !name ||
          !password ||
          !confirmPass ||
          password !== confirmPass
        }
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
