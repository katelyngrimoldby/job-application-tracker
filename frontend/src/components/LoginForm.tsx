import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authPayload = {
      username,
      password,
    };

    console.log(authPayload);

    setUsername('');
    setPassword('');
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
    </form>
  );
};

export default LoginForm;
