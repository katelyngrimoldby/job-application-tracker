import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
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
import NewApplication from './pages/applications/addApplication';
import ApplicationSingle from './pages/applications/single';
import EditApplication from './pages/applications/single/edit';
import Interviews from './pages/interviews';
import NewInterview from './pages/interviews/addInterview';
import InterviewSingle from './pages/interviews/single';
import EditInterview from './pages/interviews/single/edit';

function App() {
  const data = useFetch();
  const navigate = useNavigate();
  const { findApplication, findInterview } = useFind();
  const applicationMatch = useMatch('/applications/:id');
  const applicationEditMatch = useMatch('/applications/:id/edit');
  const interviewMatch = useMatch('/interviews/:id');
  const interviewEditMatch = useMatch('/interviews/:id/edit');

  useEffect(() => {
    const userId = window.localStorage.getItem('id');
    if (userId) {
      data.fetchData(Number(userId));
    } else {
      navigate('/');
    }
  });

  const application = findApplication(applicationMatch);
  const applicationEdit = findApplication(applicationEditMatch);
  const interview = findInterview(interviewMatch);
  const interviewEdit = findInterview(interviewEditMatch);

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
