import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useDateFormat from '../hooks/useDateFormat';
import useFind from '../hooks/useFind';
import { useStateValue } from '../state';
import { BasicFile, Interview, InterviewFile, NewInterview } from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';
import styles from '../styles/components/ContentForm.module.css';

const InterviewForm = ({
  content,
  initFiles,
  handleUpdate,
  handleAddition,
}: {
  content?: Interview;
  initFiles?: InterviewFile[];
  handleUpdate?: (
    interview: NewInterview,
    id: number,
    files: BasicFile[]
  ) => void;
  handleAddition?: (interview: NewInterview, files: BasicFile[]) => void;
}) => {
  const { getDateTimeValue } = useDateFormat();
  const [{ applications }] = useStateValue();
  const { findApplicationForInterview } = useFind();
  const [applicationId, setApplicationId] = useState(
    content
      ? content.applicationId
      : applications.length > 0
        ? applications[0].id
        : 0
  );
  const application = findApplicationForInterview(applicationId);
  const contact = useInput('text', content ? content.contact : '');
  const website = useInput('text', content ? content.website : '');
  const dateTime = useInput(
    'datetime-local',
    content ? getDateTimeValue(content.time) : ''
  );
  const [notes, setNotes] = useState(content ? content.notes : '');
  const [files, setFiles] = useState(
    initFiles
      ? initFiles.map((file) => {
          return {
            filename: file.filename,
            fileData: file.fileData,
          } as BasicFile;
        })
      : []
  );

  if (applications.length <= 0)
    return (
      <p className={styles.fallback}>
        You have no applications to assign an interview to.{' '}
        <Link to='/applications/new'>Add one now.</Link>
      </p>
    );

  const getConvertedFiles = (files: BasicFile[]) => {
    setFiles(files);
  };

  const getApplicationId = (id: string) => {
    setApplicationId(Number(id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submission: NewInterview = {
      notes,
      applicationId,
      time: new Date(dateTime.value),
    };

    if (contact.value) submission.contact = contact.value;
    if (website.value) submission.website = website.value;

    if (content) {
      if (handleUpdate) handleUpdate(submission, content.id, files);
    } else {
      if (handleAddition) handleAddition(submission, files);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <p
          id='application'
          aria-label='Application'
          role='label'
          className={styles.pLabel}
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
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor='contact'>Contact</label>
          <input
            id='contact'
            name='contact'
            required
            {...contact}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='website'>Website</label>
          <input
            id='website'
            name='website'
            {...website}
          />
        </div>
      </div>
      <div className={styles.smallInputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor='time'>Time</label>
          <input
            id='time'
            name='time'
            required
            {...dateTime}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='files'>Files</label>
          <FileUploader
            handleChange={getConvertedFiles}
            initFiles={initFiles ? initFiles : []}
          />
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <p
          aria-label='notes'
          role='label'
          className={styles.pLabel}
        >
          Notes
        </p>
        <RichTextEditor
          initialContent={notes}
          id='notes'
          setContent={setNotes}
        />
      </div>
      <button
        type='submit'
        className='primary'
      >
        Save
      </button>
    </form>
  );
};

export default InterviewForm;
