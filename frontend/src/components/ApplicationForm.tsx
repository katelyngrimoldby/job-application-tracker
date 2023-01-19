import { useState } from 'react';
import { Job, NewJob } from '../types';
import Dropdown from './Dropdown';
import RichTextEditor from './RichTextEditor';
import styles from '../styles/components/ApplicationForm.module.css';

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
  handleAddition?: (submission: NewJob) => void;
  handleUpdate?: (submission: NewJob, id: number) => void;
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
  const [notes, setNotes] = useState(
    content ? (content.notes ? content.notes : '') : ''
  );
  const [contacts, setContacts] = useState(content ? content.contacts : []);
  const [interviewDate, setInterviewDate] = useState(getFormattedDate());
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    number: '',
  });

  const handleStatusChange = (status: string) => {
    setStatus(status as Status);
  };

  const handleInterviewDelete = (interview: number) => {
    const newInterviews = interviews.filter((_, index) => index != interview);
    setInterviews(newInterviews);
  };

  const handleContactDelete = (contact: number) => {
    const newContacts = contacts.filter((_, index) => index != contact);
    setContacts(newContacts);
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
      notes,
      contacts,
    };

    if (!content) {
      if (handleAddition) handleAddition(submission);
    } else {
      if (handleUpdate) handleUpdate(submission, content.id);
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
          id='position'
          value={positionTitle}
          onChange={(event) => setPositionTitle(event.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Company'
          id='company'
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>
      <div className={styles.inputs}>
        <input
          type='text'
          placeholder='Location'
          id='location'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Compensation'
          id='compensation'
          value={compensation}
          onChange={(event) => setCompensation(event.target.value)}
        />
      </div>
      <div className={styles.inputs}>
        <div className={styles.formSection}>
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
            <Dropdown
              id='status'
              values={[
                { value: 'applied', label: 'Applied' },
                { value: 'interviewing', label: 'Interviewing' },
                { value: 'offered', label: 'Offered' },
                { value: 'rejected', label: 'Rejected' },
              ]}
              startValue={{
                label: `${status[0].toUpperCase()}${status.substring(1)}`,
                value: status,
              }}
              handleChange={handleStatusChange}
            />
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
                id='addInterviewButton'
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
                data-testid={`interview${i}`}
              >
                {e.substring(0, 10)}{' '}
                <button
                  type='button'
                  onClick={() => handleInterviewDelete(i)}
                >
                  Delete Interview
                </button>
              </p>
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='contactInputs'>Contacts</label>
            <div
              id='contactInputs'
              className={styles.contactInputs}
            >
              <input
                type='text'
                placeholder='Name'
                id='name'
                value={newContact.name}
                onChange={(event) =>
                  setNewContact({ ...newContact, name: event.target.value })
                }
              />
              <input
                type='email'
                placeholder='Email'
                id='email'
                value={newContact.email}
                onChange={(event) =>
                  setNewContact({ ...newContact, email: event.target.value })
                }
              />
              <input
                type='tel'
                placeholder='Number'
                id='number'
                value={newContact.number}
                onChange={(event) =>
                  setNewContact({ ...newContact, number: event.target.value })
                }
              />
              <button
                onClick={() => {
                  if (newContact.name) {
                    setContacts([...contacts, newContact]);
                    setNewContact({ name: '', email: '', number: '' });
                  }
                }}
                type='button'
                id='addContactButton'
              >
                Add
              </button>
            </div>
            <div className={styles.contacts}>
              {contacts.map((e, i) => (
                <div
                  key={i}
                  className={styles.contact}
                  data-testid={`contact${i}`}
                >
                  <div>
                    <p>{e.name}</p>
                    <p>{e.email}</p>
                    <p>{e.number}</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => handleContactDelete(i)}
                  >
                    Delete Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.inputWrapper}>
            <label htmlFor='jobDesc'>Job Description</label>
            <RichTextEditor
              id='jobDesc'
              initialContent={jobDescription}
              setContent={setJobDescription}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='notes'>Notes</label>
            <RichTextEditor
              id='notes'
              initialContent={notes}
              setContent={setNotes}
            />
          </div>
        </div>
      </div>
      <button
        className='primary'
        id='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default ApplicationForm;
