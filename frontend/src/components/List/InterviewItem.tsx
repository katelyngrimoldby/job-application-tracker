import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateFormat from '../../hooks/useDateFormat';
import { Interview, Application } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';
import styles from '../../styles/components/ListItem.module.css';

const ListInterviewItem = ({
  interview,
  application,
}: {
  interview: Interview;
  application: Application;
}) => {
  const [visible, setVisible] = useState(false);
  const { getShortDate, getTime } = useDateFormat();

  return (
    <li className={styles.wrapper}>
      <div className={styles.primaryInfo}>
        <span>{application.positionTitle}</span>
        <span>{application.company}</span>
        <span>{getShortDate(interview.time)}</span>
        <button
          onClick={() => setVisible(!visible)}
          className={visible ? styles.collapseBtn : styles.expandBtn}
        >
          <ArrowIcon />
        </button>
      </div>
      <div className={visible ? styles.extraVisible : styles.extraInfo}>
        <span>{interview.contact}</span>
        <span>{getTime(interview.time)}</span>
        <Link to={`/interviews/${interview.id}`}>View Interview</Link>
      </div>
    </li>
  );
};

export default ListInterviewItem;
