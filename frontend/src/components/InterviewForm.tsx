import { useState } from 'react';
import useInput from '../hooks/useInput';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import { useStateValue } from '../state';
import { Interview, NewInterview } from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const InterviewForm = ({
  content,
  handleUpdate,
  handleAddition,
}: {
  content?: Interview;
  handleUpdate?: (interview: NewInterview, id: number) => void;
  handleAddition?: (interview: NewInterview) => void;
}) => {
  const { getDateTimeValue } = useDateFormat();
  const [{ applications }] = useStateValue();

  if (applications.length <= 0)
    return (
      <p>
        You have no applications to assign an interview to.{' '}
        <Link to='/applications/new'>Add one now.</Link>
      </p>
    );
  const { findApplicationForInterview } = useFind();
  const [applicationId, setApplicationId] = useState(
    content ? content.applicationId : applications[0].id
  );
  const application = findApplicationForInterview(applicationId);
  const contact = useInput('text', content ? content.contact : '');
  const website = useInput('text', content ? content.website : '');
  const dateTime = useInput(
    'datetime-local',
    content ? getDateTimeValue(content.time) : ''
  );
  const [notes, setNotes] = useState(content ? content.notes : '');
  const [files, setFiles] = useState(content ? content.files : []);

  const getConvertedFiles = (files: string[]) => {
    setFiles(files);
  };

  const getApplicationId = (id: string) => {
    setApplicationId(Number(id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submission: NewInterview = {
      files,
      notes,
      applicationId,
      time: new Date(dateTime.value),
    };

    if (contact.value) submission.contact = contact.value;
    if (website.value) submission.website = website.value;

    if (content) {
      if (handleUpdate) handleUpdate(submission, content.id);
    } else {
      if (handleAddition) handleAddition(submission);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p
          id='application'
          aria-label='Application'
          role='label'
        >
          Application
        </p>
        <Dropdown
          values={applications.map((application) => {
            return {
              label: `${application.positionTitle} @ ${application.company}`,
              value: String(application.id),
            };
          })}
          startValue={{
            label: `${application.positionTitle} @ ${application.company}`,
            value: String(application.id),
          }}
          handleChange={getApplicationId}
          labelledBy='application'
        />
      </div>
      <div>
        <label htmlFor='contact'>Contact</label>
        <input
          name='contact'
          {...contact}
        />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input
          name='website'
          {...website}
        />
      </div>
      <div>
        <div>
          <label htmlFor='time'>Time</label>
          <input
            name='time'
            {...dateTime}
          />
        </div>
        <div>
          <label htmlFor='files'>Files</label>
          <FileUploader
            handleChange={getConvertedFiles}
            initFiles={files}
          />
        </div>
      </div>
      <div>
        <p
          aria-label='Notes'
          role='label'
        >
          Notes
        </p>
        <RichTextEditor
          initialContent={notes}
          id='notes'
          setContent={setNotes}
        />
      </div>
      <button type='submit'>Save</button>
    </form>
  );
};

export default InterviewForm;
