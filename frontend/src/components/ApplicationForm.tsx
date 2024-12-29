import { useState } from 'react';
import useInput from '../hooks/useInput';
import {
  Application,
  NewApplication,
  ApplicationFile,
  BasicFile,
} from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';
import styles from '../styles/components/ContentForm.module.css';

const statusOptions = [
  { label: 'Applied', value: 'applied' },
  { label: 'Assessments', value: 'assessments' },
  { label: 'Interviewing', value: 'interviewing' },
  { label: 'Offered', value: 'offered' },
  { label: 'Rejected', value: 'rejected' },
];

const ApplicationForm = ({
  content,
  initFiles,
  handleAddition,
  handleUpdate,
}: {
  content?: Application;
  initFiles?: ApplicationFile[];
  handleAddition?: (submission: NewApplication, files: BasicFile[]) => void;
  handleUpdate?: (
    submission: NewApplication,
    id: number,
    files: BasicFile[]
  ) => void;
}) => {
  const positionTitle = useInput('text', content ? content.positionTitle : '');
  const company = useInput('text', content ? content.company : '');
  const jobId = useInput('text', content ? content.jobId : '');
  const location = useInput('text', content ? content.location : '');
  const [status, setStatus] = useState<
    'applied' | 'assessments' | 'interviewing' | 'rejected' | 'offered'
  >(content ? content.status : 'applied');
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

  const getConvertedFiles = (files: BasicFile[]) => {
    setFiles(files);
  };

  const getStatus = (status: string) => {
    if (
      status === 'applied' ||
      status === 'assessments' ||
      status === 'interviewing' ||
      status === 'rejected' ||
      status === 'offered'
    ) {
      setStatus(status);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submission: NewApplication = {
      positionTitle: positionTitle.value,
      company: company.value,
      location: location.value,
      jobId: jobId.value,
      status,
      assessmentDate: null,
      interviewDate: null,
      offerDate: null,
      rejectionDate: null,
      notes,
    };

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
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor='position'>Position</label>
          <input
            id='position'
            name='position'
            required
            {...positionTitle}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='company'>Company</label>
          <input
            id='company'
            name='company'
            required
            {...company}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor='jobId'>Job ID</label>
          <input
            id='jobId'
            name='jobId'
            {...jobId}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='location'>Location</label>
          <input
            id='location'
            name='location'
            required
            {...location}
          />
        </div>
      </div>
      <div className={styles.smallInputGroup}>
        <div className={styles.inputWrapper}>
          <p
            id='status'
            aria-label='Status'
            role='label'
            className={styles.pLabel}
          >
            Status
          </p>
          <Dropdown
            values={statusOptions}
            startValue={statusOptions[0]}
            labelledBy='status'
            handleChange={getStatus}
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
          aria-label='Notes'
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

export default ApplicationForm;
