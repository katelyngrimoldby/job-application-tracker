import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateFormat from '../../hooks/useDateFormat';
import useStatusFormat from '../../hooks/useStatusFormat';
import { Application } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';
import styles from '../../styles/components/ListItem.module.css';

const ListApplicationItem = ({ application }: { application: Application }) => {
  const [visible, setVisible] = useState(false);
  const { getShortDate } = useDateFormat();
  const status = useStatusFormat(application.status);

  return (
    <li
      className={styles.wrapper}
      data-testid={application.id}
    >
      <div className={styles.primaryInfo}>
        <span data-testid='position'>{application.positionTitle}</span>
        <span data-testid='company'>{application.company}</span>
        <span data-testid='status'>{status}</span>
        <button
          className={visible ? styles.collapseBtn : styles.expandBtn}
          onClick={() => setVisible(!visible)}
          data-testid='toggle'
        >
          <ArrowIcon />
        </button>
      </div>
      <div
        className={visible ? styles.extraVisible : styles.extraInfo}
        data-testid='secondary'
      >
        <span data-testid='date'>{getShortDate(application.applyDate)}</span>
        <Link to={`/applications/${application.id}`}>View Application</Link>
      </div>
    </li>
  );
};

export default ListApplicationItem;
