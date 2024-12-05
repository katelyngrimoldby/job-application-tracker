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
        placeholder='Username'
        required
        {...username}
      />
      <input
        placeholder='Password'
        required
        {...username}
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
