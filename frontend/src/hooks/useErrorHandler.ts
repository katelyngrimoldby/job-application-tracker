import { useState } from 'react';
import { useStateValue, clearCurrentUser } from '../state';
import { useNavigate } from 'react-router-dom';

const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleError = (err: string) => {
    if (err === 'No refresh token') {
      dispatch(clearCurrentUser());
      window.localStorage.removeItem('id');
      navigate('/');
    } else {
      setErrorMessage(err);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return [errorMessage, handleError] as const;
};

export default useErrorHandler;
