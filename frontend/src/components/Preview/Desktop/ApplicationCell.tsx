import { Link } from 'react-router-dom';
import { Application } from '../../../types';
import useDateCalc from '../../../hooks/useDateCalc';
import useStatusFormat from '../../../hooks/useStatusFormat';

const ApplicationCellDesktop = ({
  application,
}: {
  application: Application;
}) => {
  const dateDiff = useDateCalc(application.applyDate);
  const status = useStatusFormat(application.status);

  return (
    <tr>
      <td>{application.company}</td>
      <td>{application.positionTitle}</td>
      <td>{dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today'}</td>
      <td>{status}</td>
      <td>
        <Link to={`/applications/${application.id}`}>Go to Application</Link>
      </td>
    </tr>
  );
};

export default ApplicationCellDesktop;
