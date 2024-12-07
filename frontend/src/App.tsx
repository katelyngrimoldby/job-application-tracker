import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from './hooks/useFetch';
import useFind from './hooks/useFind';
import { Header, Footer } from './components/Layout';
import Error from './components/Error';
import Applications from './pages/applications/index';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import NewApplication from './pages/applications/newApplication';
import Custom404 from './pages/custom404';
import SingleJob from './pages/applications/single';
import Edit from './pages/applications/single/edit';

function App() {
  const data = useFetch();
  const navigate = useNavigate();
  const { findApplication, findInterview } = useFind();

  useEffect(() => {
    const userId = window.localStorage.getItem('id');
    if (userId) {
      data.fetchData(Number(userId));
    } else {
      navigate('/');
    }
  }, []);

  const application = findApplication('/applications/:id');
  const applicationEdit = findApplication('/applications/:id/edit');
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
          path='/applications'
          element={<Applications />}
        />
        <Route
          path='/applications/:id'
          element={
            application ? <SingleJob job={application} /> : <Custom404 />
          }
        />
        <Route
          path='/applications/:id/edit'
          element={
            applicationEdit ? <Edit job={applicationEdit} /> : <Custom404 />
          }
        />
        <Route
          path='/applications/new'
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
