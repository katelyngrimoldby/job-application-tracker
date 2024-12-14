import { Link } from 'react-router-dom';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import useFileConversion from '../hooks/useFileConversion';
import { Application } from '../types';
import ReadOnlyRichText from './RichTextEditor/ReadOnly';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import styles from '../styles/components/ApplicationInfo.module.css';

const ApplicationInfo = ({
  application,
  handleDelete,
}: {
  application: Application;
  handleDelete: () => void;
}) => {
  const { getLongDate, getDateTime } = useDateFormat();
  const { findInterviewsForApplication } = useFind();
  const { filesToFile } = useFileConversion();

  const interviews = findInterviewsForApplication(application.id);
  const files = filesToFile(application.files);

  return (
    <>
      <section>
        <header>
          <h1 className={styles.position}>{application.positionTitle}</h1>
          <span className={styles.company}>{application.company}</span>
        </header>
        <div className={styles.secondary}>
          <span className={styles.status}>
            Status:{' '}
            {application.status.charAt(0).toUpperCase() +
              application.status.substring(1)}
          </span>
          <span>Job ID: {application.jobId}</span>
          <span>Location: {application.location}</span>
        </div>
      </section>
      <div className={styles.split}>
        <section>
          <h2>Timeline</h2>
          <ul>
            <li>Applied on {getLongDate(application.applyDate)}</li>
            {application.assessmentDate && (
              <li>
                Assessments began {getLongDate(application.assessmentDate)}
              </li>
            )}
            {application.interviewDate && (
              <li>
                Interviewss began {getLongDate(application.interviewDate)}
              </li>
            )}
            {application.rejectionDate && (
              <li>Rejected on {getLongDate(application.rejectionDate)}</li>
            )}
            {application.offerDate && (
              <li>Offer extended on {getLongDate(application.offerDate)}</li>
            )}
          </ul>
        </section>
        <section>
          <h2>Interviews</h2>
          <ul>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <li>
                  <Link
                    to={`/interviews/${interview.id}`}
                    key={interview.id}
                  >
                    {getDateTime(interview.time)} with {interview.contact}
                  </Link>
                </li>
              ))
            ) : (
              <Link
                to='/interviews/new'
                className={styles.new}
              >
                Add interview
              </Link>
            )}
          </ul>
        </section>
      </div>
      <section>
        <h2>Files and Notes</h2>
        <div className={styles.assets}>
          <ul>
            {files.length > 0 ? (
              files.map((file) => (
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
              ))
            ) : (
              <p>No files</p>
            )}
          </ul>
          <ReadOnlyRichText content={application.notes} />
        </div>
      </section>
      <div className={styles.buttons}>
        <Link to={`/applications/${application.id}/edit`}>
          <PencilIcon />
        </Link>
        <button onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>
    </>
  );
};

export default ApplicationInfo;
