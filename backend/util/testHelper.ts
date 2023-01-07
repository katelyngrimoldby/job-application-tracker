import { NewJob, NewUser, Status } from '../types';

const initialJobs: NewJob[] = [
  {
    applied: '2022-12-04T00:00:00.000Z',
    company: 'A Company',
    compensation: '90k/yr',
    interviews: ['2022-12-09T00:00:00.000Z', '2022-11-20T00:00:00.000Z'],
    jobDescription:
      '<h2>Lalalala</h2><p></p><p>Dododo</p><p></p><ul><li><p>Test</p></li><li><p>Test</p></li></ul><p></p><p><strong>Time of my liiife</strong></p><p><strong><em>Ha.</em></strong></p>',
    location: 'Remote',
    positionTitle: 'Sample Job',
    status: 'offered' as Status,
  },
  {
    applied: '2023-01-05T00:00:00.000Z',
    company: 'A Company',
    compensation: '50k/yr',
    interviews: ['2022-12-08T00:00:00.000Z', '2022-11-08T00:00:00.000Z'],
    jobDescription: '',
    location: 'Remote',
    positionTitle: 'Junior Web Developer',
    status: 'rejected' as Status,
  },
];

const initialUsers: NewUser[] = [
  {
    name: 'root',
    username: 'root',
    password: 'SamplePass',
  },
  {
    name: 'root1',
    username: 'root1',
    password: 'SamplePass',
  },
];

export default { initialUsers, initialJobs };
