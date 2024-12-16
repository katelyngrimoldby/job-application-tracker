import { Link } from 'react-router-dom';
import { Application } from '../../../types';
import useDateCalc from '../../../hooks/useDateCalc';

const ApplicationCellMobile = ({
  application,
}: {
  application: Application;
}) => {
  const dateDiff = useDateCalc(application.applyDate);

  return (
    <tr>
      <td>{application.company}</td>
      <td>{application.positionTitle}</td>
      <td>{dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today'}</td>
      <td>{application.status}</td>
      <td>
        <Link to={`/application/${application.id}`}>Go to Application</Link>
      </td>
    </tr>
  );
};

export default ApplicationCellMobile;
