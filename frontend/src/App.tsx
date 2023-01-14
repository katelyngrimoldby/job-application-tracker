import { Routes, Route, useMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { getAll } from './services/jobs';
import { getSession } from './services/userAuth';
import { useStateValue, setCurrentUser, setJobList } from './state';
import useErrorHandler from './hooks/useErrorHandler';
import { Header, Footer } from './components/Layout';
import Error from './components/Error';
import Jobs from './pages/jobs';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import NewApplication from './pages/newApplication';
import Custom404 from './pages/custom404';
import SingleJob from './pages/singleJob';
import Edit from './pages/singleJob/edit';

function App() {
  const [{ jobs }, dispatch] = useStateValue();
  const [error, handleError] = useErrorHandler();

  const fetchData = async (id: number) => {
    try {
      const userAuth = await getSession(id);
      dispatch(
        setCurrentUser({ token: userAuth.accessToken, name: userAuth.name })
      );

      if (location.pathname === '/jobs') {
        const params = location.search.toString();
        const jobs = await getAll(userAuth.accessToken, id, params);
        dispatch(setJobList(jobs));
      } else {
        const jobs = await getAll(userAuth.accessToken, id);
        dispatch(setJobList(jobs));
      }
    } catch (err) {
      if (isAxiosError(err)) {
        handleError(err.response?.data);
      }
    }
  };

  useEffect(() => {
    console.log('here');
    const userId = window.localStorage.getItem('id');
    if (userId) {
      fetchData(Number(userId));
    }
  }, []);

  const findJob = (id: number) => {
    const job = Object.values(jobs).find((job) => job.id === id);
    if (job) {
      return job;
    }
    return null;
  };

  const matchJob = useMatch('/jobs/:id');
  const job = matchJob ? findJob(Number(matchJob.params.id)) : undefined;

  const matchJobEdit = useMatch('/jobs/:id/edit');
  const jobEdit = matchJobEdit
    ? findJob(Number(matchJobEdit.params.id))
    : undefined;

  return (
    <>
      <Header />
      {error && <Error err={error} />}
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='/jobs'
          element={<Jobs />}
        />
        <Route
          path='/jobs/:id'
          element={<SingleJob job={job} />}
        />
        <Route
          path='/jobs/:id/edit'
          element={<Edit job={jobEdit} />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/new'
          element={<NewApplication />}
        />
        <Route
          path='*'
          element={<Custom404 />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
