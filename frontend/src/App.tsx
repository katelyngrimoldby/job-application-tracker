import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from './hooks/useFetch';
import useFind from './hooks/useFind';
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
  const data = useFetch();
  const navigate = useNavigate();
  const { findJob, findInterview } = useFind();

  useEffect(() => {
    const userId = window.localStorage.getItem('id');
    if (userId) {
      data.fetchData(Number(userId));
    } else {
      navigate('/');
    }
  }, []);

  const job = findJob('/jobs/:id');
  const jobEdit = findJob('/jobs/:id/edit');
  const interview = findInterview('/interviews/:id');
  const interviewEdit = findInterview('/interviews/:id/edit');

  return (
    <>
      <Header />
      {data.error && <Error err={data.error} />}
      <Routes>
        <Route
          path='/'
          element={data.user ? <Landing /> : <Login />}
        />
        <Route
          path='/jobs'
          element={<Jobs />}
        />
        <Route
          path='/jobs/:id'
          element={job ? <SingleJob job={job} /> : <Custom404 />}
        />
        <Route
          path='/jobs/:id/edit'
          element={jobEdit ? <Edit job={jobEdit} /> : <Custom404 />}
        />
        <Route
          path='/jobs/new'
          element={<NewApplication />}
        />
        <Route
          path='/interviews'
          element={<> </>}
        />
        <Route
          path='/interviews/:id'
          element={<> </>}
        />
        <Route
          path='/interviews/:id/edit'
          element={<> </>}
        />
        <Route
          path='/interviews/new'
          element={<> </>}
        />
        <Route
          path='/register'
          element={<Register />}
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
