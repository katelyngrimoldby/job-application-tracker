import { useState } from 'react';
import useInput from '../hooks/useInput';
import { Application, NewApplication } from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';
import styles from '../styles/components/ApplicationForm.module.css';

const statusOptions = [
  { label: 'Applied', value: 'applied' },
  { label: 'Assessments', value: 'assessments' },
  { label: 'Interviewing', value: 'interviewing' },
  { label: 'Offered', value: 'offered' },
  { label: 'Rejected', value: 'rejected' },
];

const ApplicationForm = ({
  content,
  handleAddition,
  handleUpdate,
}: {
  content?: Application;
  handleAddition?: (submission: NewApplication) => void;
  handleUpdate?: (submission: NewApplication, id: number) => void;
}) => {
  const positionTitle = useInput('text', content ? content.positionTitle : '');
  const company = useInput('text', content ? content.company : '');
  const jobId = useInput('text', content ? content.jobId : '');
  const location = useInput('text', content ? content.location : '');
  const [status, setStatus] = useState<
    'applied' | 'assessments' | 'interviewing' | 'rejected' | 'offered'
  >(content ? content.status : 'applied');
  const [notes, setNotes] = useState(content ? content.notes : '');
  const [files, setFiles] = useState(content ? content.files : []);

  const getConvertedFiles = (files: string[]) => {
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
      files,
      notes,
    };

    if (status == 'assessments' && !content?.assessmentDate)
      submission.assessmentDate = new Date();
    else if (status == 'interviewing' && !content?.interviewDate)
      submission.interviewDate = new Date();
    else if (status == 'rejected' && !content?.rejectionDate)
      submission.interviewDate = new Date();
    else if (status == 'offered' && !content?.offerDate)
      submission.offerDate = new Date();

    if (content) {
      if (content.assessmentDate)
        submission.assessmentDate = content.assessmentDate;
      else if (status == 'assessments') submission.assessmentDate = new Date();
      if (content.interviewDate)
        submission.interviewDate = content.interviewDate;
      else if (status == 'interviewing') submission.interviewDate = new Date();
      if (content.rejectionDate)
        submission.rejectionDate = content.rejectionDate;
      else if (status == 'rejected') submission.rejectionDate = new Date();
      if (content.offerDate) submission.offerDate = content.offerDate;
      else if (status == 'offered') submission.offerDate = new Date();

      if (handleUpdate) handleUpdate(submission, content.id);
    } else {
      switch (status) {
        case 'assessments':
          submission.assessmentDate = new Date();
          break;
        case 'interviewing':
          submission.interviewDate = new Date();
          break;
        case 'offered':
          submission.offerDate = new Date();
          break;
        case 'rejected':
          submission.rejectionDate = new Date();
      }

      if (handleAddition) handleAddition(submission);
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
            required
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
          <FileUploader
            handleChange={getConvertedFiles}
            initFiles={files}
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
