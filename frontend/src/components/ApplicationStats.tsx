import styles from '../styles/components/ApplicationStats.module.css';

const ApplicationStats = ({ data }: { data: Number[] }) => {
  return (
    <div className={styles.wrapper}>
      <span>{`${String(data[0])} ${data[0] == 1 ? 'Application' : 'Applications'}`}</span>
      <span>{`${String(data[1])} ${data[1] == 1 ? 'Assessment' : 'Assessments'}`}</span>
      <span>{`${String(data[2])} ${data[2] == 1 ? 'Interview' : 'Interviews'}`}</span>
      <span>{`${String(data[3])} ${data[3] == 1 ? 'Offer' : 'Offers'}`}</span>
    </div>
  );
};

export default ApplicationStats;