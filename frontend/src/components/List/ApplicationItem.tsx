import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateFormat from '../../hooks/useDateFormat';
import { Application } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';
import styles from '../../styles/components/List/ApplicationItem.module.css';

const ListApplicationItem = ({ application }: { application: Application }) => {
  const [visible, setVisible] = useState(false);
  const { getShortDate } = useDateFormat();

  return (
    <li className={styles.wrapper}>
      <div className={styles.primaryInfo}>
        <span>{application.positionTitle}</span>
        <span>{application.company}</span>
        <span>
          {application.status.charAt(0).toUpperCase() +
            application.status.substring(1)}
        </span>
        <button
          className={visible ? styles.collapseBtn : styles.expandBtn}
          onClick={() => setVisible(!visible)}
        >
          <ArrowIcon />
        </button>
      </div>
      <div className={visible ? styles.extraVisible : styles.extraInfo}>
        <span>{getShortDate(application.applyDate)}</span>
        <Link to={`/applications/${application.id}`}>View Application</Link>
      </div>
    </li>
  );
};

export default ListApplicationItem;
