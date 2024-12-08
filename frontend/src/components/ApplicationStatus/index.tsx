import { useStateValue } from '../../state';
import ApplicationPie from './ApplicationPie';
import ApplicationStats from './ApplicationStats';

const ApplicationStatus = () => {
  const [{ applications }] = useStateValue();

  const data = [
    applications.filter((application) => application.status === 'applied')
      .length,
    applications.filter((application) => application.status === 'assessments')
      .length,
    applications.filter((application) => application.status === 'interviewing')
      .length,
    applications.filter((application) => application.status === 'offered')
      .length,
  ];

  return (
    <>
      <ApplicationPie data={data} />
      <ApplicationStats data={data} />
    </>
  );
};

export default ApplicationStatus;
