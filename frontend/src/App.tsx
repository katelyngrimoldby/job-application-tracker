import { Routes, Route, useMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { getAll } from './services/jobs';
import { useStateValue, setCurrentUser, setJobList } from './state';
import { Header, Footer } from './components/Layout';
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

  const fetchJobs = async (token: string) => {
    if (location.pathname === '/jobs') {
      const params = location.search.toString();
      const jobs = await getAll(token, params);
      dispatch(setJobList(jobs));
    } else {
      const jobs = await getAll(token);
      dispatch(setJobList(jobs));
    }
  };

  useEffect(() => {
    const userJSON = window.localStorage.getItem('User');
    if (userJSON) {
      const userAuth = JSON.parse(userJSON);
      dispatch(setCurrentUser(userAuth));

      fetchJobs(userAuth.token);
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
