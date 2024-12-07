import { Link } from 'react-router-dom';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import useFileConversion from '../hooks/useFileConversion';
import { Interview } from '../types';
import ReadOnlyRichText from './RichTextEditor/ReadOnly';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

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

  const application = findApplicationForInterview(interview.id);
  const files = filesToFile(interview.files);

  return (
    <>
      <div>
        <h1>{application.positionTitle}</h1>
        <span>{application.company}</span>
      </div>
      <div>
        <span>With {interview.contact}</span>
        <span>{getDateTime(interview.time)}</span>
        <Link to={`/applications/${interview.applicationId}`}>Application</Link>
        {interview.website.length > 0 && (
          <a href={interview.website}>Website</a>
        )}
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
        <ReadOnlyRichText content={interview.notes} />
      </section>
      <div>
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
