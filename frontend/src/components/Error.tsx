import styles from '../styles/components/Error.module.css';

const Error = ({ err }: { err: string }) => {
  return (
    <div className={styles.error}>
      <span className={styles.errorText}>{err}</span>
    </div>
  );
};

export default Error;
