import LoginForm from '../components/LoginForm';
import styles from '../styles/pages/login.module.css';

const Login = () => {
  return (
    <main className={styles.main}>
      <h2>Login</h2>
      <LoginForm />
    </main>
  );
};

export default Login;
