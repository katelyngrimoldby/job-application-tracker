import { Routes, Route } from 'react-router-dom';
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

// const dummyJob: Job = {
//   jobDescription:
//     '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"teee"}]}]}',
//   positionTitle: 'test',
//   location: 'remote',
//   company: 'test inc',
//   applied: '2022-12-22',
//   compensation: '5k',
//   interviews: ['2022-12-22', '2021-01-02'],
//   status: 'offered',
//   id: 1,
//   userId: 1,
// };

function App() {
  const [{ user }, dispatch] = useStateValue();

  const fetchJobs = async (token: string) => {
    const jobs = await getAll(token);
    dispatch(setJobList(jobs));
  };

  useEffect(() => {
    const userJSON = window.localStorage.getItem('User');
    if (userJSON) {
      const userAuth = JSON.parse(userJSON);
      dispatch(setCurrentUser(userAuth));

      fetchJobs(userAuth.token);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={user ? <Jobs /> : <Landing />}
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
