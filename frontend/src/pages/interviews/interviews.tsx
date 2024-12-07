import { useStateValue, setInterviewList } from '../../state';
import { useSearchParams } from 'react-router-dom';
import useErrorHandler from '../../hooks/useErrorHandler';
import { isAxiosError } from 'axios';
import { getAll } from '../../services/interviews';
import Error from '../../components/Error';
import List from '../../components/List';
import FiltrationMenu from '../../components/FiltrationMenu';

const Interviews = () => {
  const [{ interviews, user }, dispatch] = useStateValue();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, handleError] = useErrorHandler();

  if (!user) {
    return null;
  }

  const handleChange = async (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);

    const params = location.search.toString();

    try {
      const userId = window.localStorage.getItem('id');

      const interviews = await getAll(user.token, Number(userId), params);
      dispatch(setInterviewList(interviews));
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data.error);
      }
    }
  };

  return (
    <main>
      {error && <Error err={error} />}
      <FiltrationMenu
        handleChange={handleChange}
        toFilter={false}
      />
      <List
        type='interviews'
        interviews={interviews}
      />
    </main>
  );
};

export default Interviews;
