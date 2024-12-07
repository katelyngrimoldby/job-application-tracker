import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import useFileConversion from '../hooks/useFileConversion';
import { Application } from '../types';
import ReadOnlyRichText from './RichTextEditor/ReadOnly';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

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
  const [interviews, setInterviews] = useState(
    findInterviewsForApplication(application.id)
  );
  const [files, setFiles] = useState(filesToFile(application.files));

  useEffect(() => {
    setInterviews(findInterviewsForApplication(application.id));
    setFiles(filesToFile(application.files));
  }, [application]);

  return (
    <>
      <section>
        <h1>{application.positionTitle}</h1>
        <div>
          <span>{application.company}</span>
          <span>{application.status}</span>
        </div>
        <div>
          <span>Job ID: {application.jobId}</span>
          <span>Location: {application.location}</span>
        </div>
      </section>
      <div>
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
            {interviews.map((interview) => (
              <li>
                <Link to={`/interviews/${interview.id}`}>
                  {getDateTime(interview.time)} with {interview.contact}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section>
        <h2>Files and Notes</h2>
        <ul>
          {files.map((file) => (
            <li>
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
        <ReadOnlyRichText content={application.notes} />
      </section>
      <div>
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
