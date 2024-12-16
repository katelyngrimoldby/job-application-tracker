import { Link } from 'react-router-dom';
import { Interview } from '../../../types';
import useFind from '../../../hooks/useFind';
import useDateFormat from '../../../hooks/useDateFormat';
import styles from '../../../styles/components/Preview/MobileCell.module.css';

const InterviewCellMobile = ({ interview }: { interview: Interview }) => {
  const { findApplicationForInterview } = useFind();
  const application = findApplicationForInterview(interview.applicationId);
  const { getShortDate, getTime } = useDateFormat();

  return (
    <div className={styles.wrapper}>
      <span>Company: {application.company}</span>
      <span>Contact: {interview.contact}</span>
      <span>Date: {getShortDate(interview.time)}</span>
      <span>Time: {getTime(interview.time)}</span>
      <Link to={`/interviews/${interview.id}`}>View Interview</Link>
    </div>
  );
};

export default InterviewCellMobile;
