import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateFormat from '../../hooks/useDateFormat';
import { Interview, Application } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';

const ListInterviewItem = ({
  interview,
  application,
}: {
  interview: Interview;
  application: Application;
}) => {
  const [visible, setVisible] = useState(false);
  const { getShortDate } = useDateFormat();

  return (
    <li>
      <div>
        <span>{application.positionTitle}</span>
        <span>{application.company}</span>
        <span>{getShortDate(interview.time)}</span>
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
