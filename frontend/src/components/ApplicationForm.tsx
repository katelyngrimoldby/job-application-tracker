import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, addJob, updateJob } from '../state';
import { addNew, editJob } from '../services/jobs';
import { Job } from '../types';
import RichTextEditor from './RichTextEditor';

type Status = 'applied' | 'interviewing' | 'offered' | 'rejected';

const getFormattedDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;

  return `${new Date().getFullYear()}-${month < 10 ? '0' + month : month}-${
    date < 10 ? '0' + date : date
  }`;
};

const ApplicationForm = ({ content }: { content?: Job }) => {
  const navigate = useNavigate();
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
  const [error, setError] = useState('');

  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    return <h2>401 Unauthorized</h2>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      try {
        const job = await addNew(user.token, submission);
        dispatch(addJob(job));
        navigate(`/jobs/${job.id}`);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data);
        }
      }
    } else {
      try {
        const job = await editJob(user.token, submission, content.id);
        dispatch(updateJob(job));
        navigate(`/jobs/${job.id}`);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
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
      <input
        type='text'
        placeholder='Location'
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        required
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
        {interviews.map((e, i) => (
          <p key={i}>{e.substring(0, 10)}</p>
        ))}
      </div>
      <div>
        <label htmlFor='jobDesc'>Job Description</label>
        <RichTextEditor
          id='jobDesc'
          initialContent={jobDescription}
          setContent={setJobDescription}
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default ApplicationForm;
