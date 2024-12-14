import { useStateValue, setApplicationList } from '../../state';
import { useSearchParams } from 'react-router-dom';
import useErrorHandler from '../../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { getAll } from '../../services/applications';
import Error from '../../components/Error';
import List from '../../components/List';
import FiltrationMenu from '../../components/FiltrationMenu';
import styles from '../../styles/pages/applications.module.css';

const Applications = () => {
  const [{ user }, dispatch] = useStateValue();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleChange = async (name: string, value: string) => {
    if (value) {
      searchParams.set(name, value);
      setSearchParams(searchParams);
    } else {
      if (searchParams.get('filter')) {
        searchParams.delete(name);
        setSearchParams(searchParams);
      }
    }
    const params = location.search.toString();

    try {
      const userId = window.localStorage.getItem('id');

      const applications = await getAll(user.token, Number(userId), params);
      dispatch(setApplicationList(applications));
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main className={styles.main}>
      {error && <Error err={error} />}
      <FiltrationMenu handleChange={handleChange} />
      <List type='applications' />
    </main>
  );
};

export default Applications;
