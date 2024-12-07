import { Link } from 'react-router-dom';
import { Application } from '../../types';
import useDateCalc from '../../hooks/useDateCalc';

const ApplicationCell = ({ application }: { application: Application }) => {
  const dateDiff = useDateCalc(application.applyDate);

  return (
    <div>
      <span>Company: {application.company}</span>
      <span>Position: {application.positionTitle}</span>
      <span>
        Date: {dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today'}
      </span>
      <span>Status: {application.status}</span>
      <Link to={`/application/${application.id}`}>Go to Application</Link>
    </div>
  );
};

export default ApplicationCell;
