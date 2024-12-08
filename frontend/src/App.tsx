import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from './hooks/useFetch';
import useFind from './hooks/useFind';
import { Header, Footer } from './components/Layout';
import Error from './components/Error';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Custom404 from './pages/custom404';
import Applications from './pages/applications/index';
import NewApplication from './pages/applications/newApplication';
import ApplicationSingle from './pages/applications/single';
import EditApplication from './pages/applications/single/edit';
import Interviews from './pages/interviews/interviews';
import NewInterview from './pages/interviews/newInterview';
import InterviewSingle from './pages/interviews/single';
import EditInterview from './pages/interviews/single/edit';

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
          element={data.user ? <Dashboard /> : <Login />}
        />
        <Route
          path='/applications'
          element={<Applications />}
        />
        <Route
          path='/applications/:id'
          element={
            application ? (
              <ApplicationSingle application={application} />
            ) : (
              <Custom404 />
            )
          }
        />
        <Route
          path='/applications/:id/edit'
          element={
            applicationEdit ? (
              <EditApplication application={applicationEdit} />
            ) : (
              <Custom404 />
            )
          }
        />
        <Route
          path='/applications/new'
          element={<NewApplication />}
        />
        <Route
          path='/interviews'
          element={<Interviews />}
        />
        <Route
          path='/interviews/:id'
          element={
            interview ? (
              <InterviewSingle interview={interview} />
            ) : (
              <Custom404 />
            )
          }
        />
        <Route
          path='/interviews/:id/edit'
          element={
            interviewEdit ? (
              <EditInterview interview={interviewEdit} />
            ) : (
              <Custom404 />
            )
          }
        />
        <Route
          path='/interviews/new'
          element={<NewInterview />}
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
