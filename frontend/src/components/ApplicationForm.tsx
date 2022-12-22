import { Job } from '../types';
import RichTextEditor from './RichTextEditor';

const ApplicationForm = ({ content }: { content?: Job }) => {
  return (
    <form>
      <input
        type='text'
        placeholder='Position'
      />
      <input
        type='text'
        placeholder='Company'
      />
      <input
        type='text'
        placeholder='Location'
      />
      <label htmlFor='appliedDate'>Applied: </label>
      <input
        type='date'
        id='appliedDate'
      />
      <input
        type='text'
        placeholder='Compensation'
      />
      <label htmlFor='status'>Status: </label>
      <select id='status'>
        <option value='applied'>Applied</option>
        <option value='interviewing'>Interviewing</option>
        <option value='offered'>Offered</option>
        <option value='rejected'>Rejected</option>
      </select>
      <label htmlFor='interviewDate'>Interview Dates: </label>
      <input
        type='date'
        id='interviewDate'
      />
      <div>
        <label htmlFor='jobDesc'>Job Description</label>
        <RichTextEditor id='jobDesc' />
      </div>
      <div>
        <label htmlFor='notes'>Notes</label>
        <RichTextEditor id='notes' />
      </div>
    </form>
  );
};

export default ApplicationForm;
