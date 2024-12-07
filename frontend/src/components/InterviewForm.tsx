import { useState } from 'react';
import useInput from '../hooks/useInput';
import { useStateValue } from '../state';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';

const InterviewForm = () => {
  const [{ jobs }] = useStateValue();
  const contact = useInput('text');
  const website = useInput('text');
  const dateTime = useInput('datetime-local');
  const [notes, setNotes] = useState('');

  return (
    <form>
      <div>
        <p
          id='application'
          aria-label='Application'
          role='label'
        >
          Application
        </p>
        <Dropdown
          values={jobs.map((job) => {
            return {
              label: `${job.positionTitle} @ ${job.company}`,
              value: String(job.id),
            };
          })}
          handleChange={() => null}
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
          <FileUploader />
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
    </form>
  );
};
