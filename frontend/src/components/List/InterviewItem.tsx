import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateFormat from '../../hooks/useDateFormat';
import { Interview, Job } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';

const ListInterviewItem = ({
  interview,
  job,
}: {
  interview: Interview;
  job: Job;
}) => {
  const [visible, setVisible] = useState(false);
  const { getDate } = useDateFormat(interview.time);

  return (
    <li>
      <div>
        <span>{job.positionTitle}</span>
        <span>{job.company}</span>
        <span>{getDate()}</span>
        <button onClick={() => setVisible(!visible)}>
          <ArrowIcon />
        </button>
      </div>
      <div>
        <span>{interview.contact}</span>
        <span>
          {interview.time.getHours()}:{interview.time.getMinutes()}
        </span>
        <Link to={`/interviews/${interview.id}`}></Link>
      </div>
    </li>
  );
};

export default ListInterviewItem;
