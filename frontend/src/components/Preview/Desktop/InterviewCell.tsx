import { Link } from 'react-router-dom';
import { Interview } from '../../../types';
import useFind from '../../../hooks/useFind';
import useDateFormat from '../../../hooks/useDateFormat';

const InterviewCellDesktop = ({ interview }: { interview: Interview }) => {
  const { findApplicationForInterview } = useFind();
  const application = findApplicationForInterview(interview.applicationId);
  const { getShortDate, getTime } = useDateFormat();

  return (
    <tr>
      <td>{application.company}</td>
      <td>{interview.contact}</td>
      <td>{getShortDate(interview.time)}</td>
      <td>{getTime(interview.time)}</td>
      <td>
        <Link to={`/interviews/${interview.id}`}>View Interview</Link>
      </td>
    </tr>
  );
};

export default InterviewCellDesktop;
