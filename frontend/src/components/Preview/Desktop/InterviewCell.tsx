import { Link } from 'react-router-dom';
import { Interview } from '../../../types';
import useFind from '../../../hooks/useFind';
import useDateFormat from '../../../hooks/useDateFormat';

const InterviewCellDesktop = ({ interview }: { interview: Interview }) => {
  const { findApplicationForInterview } = useFind();
  const application = findApplicationForInterview(interview.applicationId);
  const { getShortDate, getTime } = useDateFormat();

  return (
    <tr data-testid={interview.id}>
      <td data-testid='company'>{application.company}</td>
      <td data-testid='contact'>{interview.contact}</td>
      <td data-testid='date'>{getShortDate(interview.time)}</td>
      <td data-testid='time'>{getTime(interview.time)}</td>
      <td data-testid='link'>
        <Link to={`/interviews/${interview.id}`}>View Interview</Link>
      </td>
    </tr>
  );
};

export default InterviewCellDesktop;
