import { Link } from 'react-router-dom';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import useFileConversion from '../hooks/useFileConversion';
import { Interview } from '../types';
import ReadOnlyRichText from './RichTextEditor/ReadOnly';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import styles from '../styles/components/InterviewInfo.module.css';

const InterviewInfo = ({
  interview,
  handleDelete,
}: {
  interview: Interview;
  handleDelete: () => void;
}) => {
  const { getDateTime } = useDateFormat();
  const { findApplicationForInterview } = useFind();
  const { filesToFile } = useFileConversion();

  const application = findApplicationForInterview(interview.applicationId);
  const files = filesToFile(interview.files);

  return (
    <>
      <header>
        <h1 className={styles.position}>{application.positionTitle}</h1>
        <span className={styles.company}>{application.company}</span>
      </header>
      <div className={styles.secondary}>
        <div className={styles.first}>
          <span>With {interview.contact}</span>
          <span>{getDateTime(interview.time)}</span>
        </div>
        <div className={styles.second}>
          <Link to={`/applications/${interview.applicationId}`}>
            Application
          </Link>
          {interview.website ? (
            interview.website.length > 0 && (
              <a href={interview.website}>Website</a>
            )
          ) : (
            <p>No website</p>
          )}
        </div>
      </div>
      <section>
        <h2>Files and Notes</h2>
        <div className={styles.assets}>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <button
                  onClick={() => {
                    const pdfWindow = window.open('');
                    pdfWindow?.document.write(
                      `<iframe width="100%" height="100%" src="${URL.createObjectURL(file as Blob)}"></iframe>`
                    );
                  }}
                >
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
          <ReadOnlyRichText content={interview.notes} />
        </div>
      </section>
      <div className={styles.buttons}>
        <Link to={`/interviews/${interview.id}/edit`}>
          <PencilIcon />
        </Link>
        <button onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>
    </>
  );
};

export default InterviewInfo;
