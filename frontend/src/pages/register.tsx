import { useNavigate, Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { register } from '../services/userAuth';
import useErrorHandler from '../hooks/useErrorHandler';
import RegistrationForm from '../components/RegistrationForm';
import Error from '../components/Error';

const Register = () => {
  const navigate = useNavigate();
  const [error, handleError] = useErrorHandler();

  const handleSubmit = async (newUser: {
    username: string;
    name: string;
    password: string;
  }) => {
    try {
      await register(newUser);
      navigate('/login');
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main>
      <h1>Register</h1>
      {error && <Error err={error} />}
      <RegistrationForm handleRegistration={handleSubmit} />
      <p>
        Already have an account? <Link to='/'>Log in</Link>
      </p>
    </main>
  );
};

export default Register;
