import useInput from '../hooks/useInput';
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
  const username = useInput('text');
  const name = useInput('text');
  const password = useInput('password');
  const confirmPass = useInput('password');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      username: username.value,
      name: name.value,
      password: password.value,
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
          id='username'
          placeholder='Username'
          required
          {...username}
        />
        <input
          id='name'
          placeholder='Name'
          required
          {...name}
        />
      </div>
      <div className={styles.inputs}>
        <input
          id='password'
          placeholder='Password'
          required
          min={3}
          {...password}
        />
        <input
          id='confirmPass'
          placeholder='Confirm Password'
          required
          {...confirmPass}
        />
      </div>
      <button
        disabled={
          !username.value ||
          !name.value ||
          password.value.length < 5 ||
          !confirmPass.value ||
          password.value !== confirmPass.value
        }
        className='primary'
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
