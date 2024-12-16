import { Link } from 'react-router-dom';
import { Application } from '../../../types';
import useDateCalc from '../../../hooks/useDateCalc';
import styles from '../../../styles/components/Preview/MobileCell.module.css';

const ApplicationCellMobile = ({
  application,
}: {
  application: Application;
}) => {
  const dateDiff = useDateCalc(application.applyDate);

  return (
    <div className={styles.wrapper}>
      <span>Company: {application.company}</span>
      <span>Position: {application.positionTitle}</span>
      <span>
        Date: {dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'Today'}
      </span>
      <span>Status: {application.status}</span>
      <Link to={`/application/${application.id}`}>Go to Application</Link>
    </div>
  );
};

export default ApplicationCellMobile;
