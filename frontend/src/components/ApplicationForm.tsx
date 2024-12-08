import { useState } from 'react';
import useInput from '../hooks/useInput';
import { Application } from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';

const statusOptions = [
  { label: 'Applied', value: 'applied' },
  { label: 'Assessments', value: 'assessments' },
  { label: 'Interviewing', value: 'interviewing' },
  { label: 'Offered', value: 'offered' },
  { label: 'Rejected', value: 'rejected' },
];

const ApplicationForm = ({ content }: { content?: Application }) => {
  const position = useInput('text', content ? content.positionTitle : '');
  const company = useInput('text', content ? content.company : '');
  const jobId = useInput('text', content ? content.jobId : '');
  const location = useInput('text', content ? content.location : '');
  const [notes, setNotes] = useState(content ? content.notes : '');

  return (
    <form>
      <div>
        <label htmlFor='position'>Position</label>
        <input
          name='position'
          required
          {...position}
        />
      </div>
      <div>
        <label htmlFor='company'>Company</label>
        <input
          name='company'
          required
          {...company}
        />
      </div>
      <div>
        <label htmlFor='jobId'>Job ID</label>
        <input
          name='jobId'
          required
          {...jobId}
        />
      </div>
      <div>
        <label htmlFor='location'>Location</label>
        <input
          name='location'
          required
          {...location}
        />
      </div>
      <div>
        <p
          id='status'
          aria-label='Status'
          role='label'
        >
          Status
        </p>
        <Dropdown
          values={statusOptions}
          startValue={statusOptions[0]}
          labelledBy='status'
          handleChange={() => null}
        />
      </div>
      <div>
        <label htmlFor='files'>Files</label>
        <FileUploader />
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
    </form>
  );
};

export default ApplicationForm;
