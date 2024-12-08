import { useState } from 'react';
import useInput from '../hooks/useInput';
import { useStateValue } from '../state';
import { Interview } from '../types';
import FileUploader from './FileUploader';
import RichTextEditor from './RichTextEditor';
import Dropdown from './Dropdown';

const InterviewForm = ({ content }: { content?: Interview }) => {
  const [{ applications }] = useStateValue();
  const contact = useInput('text', content ? content.contact : '');
  const website = useInput('text', content ? content.website : '');
  const dateTime = useInput(
    'datetime-local',
    content
      ? `${content.time.getFullYear()}-${content.time.getMonth() + 1}-${content.time.getDate()}T${content.time.getHours()}:${content.time.getMinutes()}`
      : ''
  );
  const [notes, setNotes] = useState(content ? content.notes : '');

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
          values={applications.map((application) => {
            return {
              label: `${application.positionTitle} @ ${application.company}`,
              value: String(application.id),
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

export default InterviewForm;
