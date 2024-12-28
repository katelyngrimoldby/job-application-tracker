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
    <li
      className={styles.wrapper}
      data-testid={interview.id}
    >
      <div className={styles.primaryInfo}>
        <span data-testid='position'>{application.positionTitle}</span>
        <span data-testid='company'>{application.company}</span>
        <span data-testid='date'>{getShortDate(interview.time)}</span>
        <button
          onClick={() => setVisible(!visible)}
          className={visible ? styles.collapseBtn : styles.expandBtn}
          data-testid='toggle'
        >
          <ArrowIcon />
        </button>
      </div>
      <div
        className={visible ? styles.extraVisible : styles.extraInfo}
        data-testid='secondary'
      >
        <span data-testid='contact'>{interview.contact}</span>
        <span data-testid='time'>{getTime(interview.time)}</span>
        <Link to={`/interviews/${interview.id}`}>View Interview</Link>
      </div>
    </li>
  );
};

export default ListInterviewItem;
