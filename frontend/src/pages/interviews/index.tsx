import List from '../../components/List';
import styles from '../../styles/pages/content.module.css';

const Interviews = () => {
  return (
    <main className={styles.main}>
      <List type='interviews' />
    </main>
  );
};

export default Interviews;
