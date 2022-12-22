import { useState } from 'react';
import { Job } from '../types';
import RichTextEditor from './RichTextEditor';

type Status = 'applied' | 'interviewing' | 'offered' | 'rejected';

const ApplicationForm = ({ content }: { content?: Job }) => {
  const [positionTitle, setPositionTitle] = useState(
    content ? content.positionTitle : ''
  );
  const [company, setCompany] = useState(content ? content.company : '');
  const [address, setAddress] = useState(content ? content.address : '');
  const [applied, setApplied] = useState(
    content
      ? content.applied
      : `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`
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

  const [interviewDate, setInterviewDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  return (
    <form>
      <input
        type='text'
        placeholder='Position'
        value={positionTitle}
        onChange={(event) => setPositionTitle(event.target.value)}
      />
      <input
        type='text'
        placeholder='Company'
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />
      <input
        type='text'
        placeholder='Location'
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <label htmlFor='appliedDate'>Applied: </label>
      <input
        type='date'
        id='appliedDate'
        value={applied}
        onChange={(event) => setApplied(event.target.value)}
      />
      <input
        type='text'
        placeholder='Compensation'
        value={compensation}
        onChange={(event) => setCompensation(event.target.value)}
      />
      <label htmlFor='status'>Status: </label>
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
      <div>
        <label htmlFor='interviewDate'>Interview Dates: </label>
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
      <div>
        <label htmlFor='jobDesc'>Job Description</label>
        <RichTextEditor
          id='jobDesc'
          initialContent={
            jobDescription ? JSON.parse(jobDescription) : jobDescription
          }
          setContent={setJobDescription}
        />
      </div>
    </form>
  );
};

export default ApplicationForm;
