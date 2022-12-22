import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Layout';
import Jobs from './pages/jobs';
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
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Jobs />}
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
