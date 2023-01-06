import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userAuth';
import { isAxiosError } from 'axios';
import RegistrationForm from '../components/RegistrationForm';
import Error from '../components/Error';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
        setError(err.response?.data.error);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <main>
      <h2>Register</h2>
      {error && <Error err={error} />}
      <RegistrationForm handleRegistration={handleSubmit} />
    </main>
  );
};

export default Register;
