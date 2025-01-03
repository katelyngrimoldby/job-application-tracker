import useInput from '../hooks/useInput';
import styles from '../styles/components/LoginForm.module.css';

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (authPayload: { username: string; password: string }) => void;
}) => {
  const username = useInput('text');
  const password = useInput('password');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authPayload = {
      username: username.value,
      password: password.value,
    };

    handleLogin(authPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        id='username'
        placeholder='Username'
        required
        {...username}
      />
      <input
        id='password'
        placeholder='Password'
        required
        {...password}
      />
      <button
        disabled={!username.value || !password.value}
        className='primary'
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
