import { useState } from 'react';
import { Job, NewJob } from '../types';
import RichTextEditor from './RichTextEditor';
import styles from '../styles/components/ApplicationForm.module.css';
import closeIcon from '../assets/close.svg';

type Status = 'applied' | 'interviewing' | 'offered' | 'rejected';

const getFormattedDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;

  return `${new Date().getFullYear()}-${month < 10 ? '0' + month : month}-${
    date < 10 ? '0' + date : date
  }`;
};

const ApplicationForm = ({
  content,
  handleAddition,
  handleUpdate,
}: {
  content?: Job;
  handleAddition: (submission: NewJob) => void;
  handleUpdate: (submission: NewJob, id: number) => void;
}) => {
  const [positionTitle, setPositionTitle] = useState(
    content ? content.positionTitle : ''
  );
  const [company, setCompany] = useState(content ? content.company : '');
  const [location, setLocation] = useState(content ? content.location : '');
  const [applied, setApplied] = useState(
    content ? content.applied.substring(0, 10) : getFormattedDate()
  );
  const [compensation, setCompensation] = useState(
    content ? content.compensation : ''
  );
  const [status, setStatus] = useState<Status>(
    content ? content.status : 'applied'
  );
  const [interviews, setInterviews] = useState(
    content ? content.interviews : []
  );
  const [jobDescription, setJobDescription] = useState(
    content ? content.jobDescription : ''
  );
  const [interviewDate, setInterviewDate] = useState(getFormattedDate());

  const handleDelete = (interview: number) => {
    const newInterviews = interviews.filter((_, index) => index != interview);
    setInterviews(newInterviews);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submission = {
      positionTitle,
      company,
      location,
      applied,
      compensation,
      status,
      interviews,
      jobDescription,
    };

    if (!content) {
      handleAddition(submission);
    } else {
      handleUpdate(submission, content.id);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={styles.inputs}>
        <input
          type='text'
          placeholder='Position'
          value={positionTitle}
          onChange={(event) => setPositionTitle(event.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Company'
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>
      <div className={styles.inputs}>
        <input
          type='text'
          placeholder='Location'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Compensation'
          value={compensation}
          onChange={(event) => setCompensation(event.target.value)}
        />
      </div>
      <div className={styles.inputs}>
        <div>
          <div className={styles.inputWrapper}>
            <label htmlFor='appliedDate'>Applied</label>
            <input
              type='date'
              id='appliedDate'
              value={applied}
              onChange={(event) => setApplied(event.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='status'>Status</label>
            <select
              id='status'
              onChange={(event) => setStatus(event.target.value as Status)}
              value={status}
            >
              <option value='applied'>Applied</option>
              <option value='interviewing'>Interviewing</option>
              <option value='offered'>Offered</option>
              <option value='rejected'>Rejected</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='interviewDate'>Interview Dates</label>
            <div className={styles.interviewInput}>
              <input
                type='date'
                id='interviewDate'
                value={interviewDate}
                onChange={(event) => setInterviewDate(event.target.value)}
              />
              <button
                onClick={() => setInterviews([...interviews, interviewDate])}
                type='button'
              >
                Add
              </button>
            </div>
          </div>
          <div className={styles.interviews}>
            {interviews.map((e, i) => (
              <p
                key={i}
                className={styles.interview}
              >
                {e.substring(0, 10)}{' '}
                <button
                  type='button'
                  onClick={() => handleDelete(i)}
                >
                  <img
                    src={closeIcon}
                    alt='Delete'
                    width='24'
                    height='24'
                  />
                </button>
              </p>
            ))}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='jobDesc'>Job Description</label>
          <RichTextEditor
            id='jobDesc'
            initialContent={jobDescription}
            setContent={setJobDescription}
          />
        </div>
      </div>
      <button className='primary'>Submit</button>
    </form>
  );
};

export default ApplicationForm;
