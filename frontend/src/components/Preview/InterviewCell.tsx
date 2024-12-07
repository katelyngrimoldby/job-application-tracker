import { Link } from 'react-router-dom';
import { Interview } from '../../types';
import useFind from '../../hooks/useFind';
import useDateFormat from '../../hooks/useDateFormat';

const InterviewCell = ({ interview }: { interview: Interview }) => {
  const { findApplicationForInterview } = useFind();
  const application = findApplicationForInterview(interview.applicationId);
  const { getShortDate } = useDateFormat();

  return (
    <div>
      <span>Company: {application.company}</span>
      <span>Contact: {interview.contact}</span>
      <span>Date: {getShortDate(interview.time)}</span>
      <span>
        Time: {interview.time.getHours()}:{interview.time.getMinutes()}
      </span>
      <Link to={`/interviews/${interview.id}`}>View All Details</Link>
    </div>
  );
};

export default InterviewCell;
