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
    <tr data-testid={application.id}>
      <td data-testid='company'>{application.company}</td>
      <td data-testid='position'>{application.positionTitle}</td>
      <td data-testid='date'>
        {dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today'}
      </td>
      <td data-testid='status'>{status}</td>
      <td data-testid='link'>
        <Link to={`/applications/${application.id}`}>Go to Application</Link>
      </td>
    </tr>
  );
};

export default ApplicationCellDesktop;
