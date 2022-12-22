import { Footer } from './components/Layout';
import ApplicationForm from './components/ApplicationForm';
import { Job } from './types';

const dummyJob: Job = {
  jobDescription:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"teee"}]}]}',
  positionTitle: 'test',
  location: 'remote',
  company: 'test inc',
  applied: '2022-12-22',
  compensation: '5k',
  interviews: ['2022-12-22', '2021-01-02'],
  status: 'offered',
  id: 1,
  userId: 1,
};

function App() {
  return (
    <>
      <p>Hello World!</p>
      <ApplicationForm content={dummyJob} />
      <Footer />
    </>
  );
}

export default App;
