import { useState } from 'react';
import useInput from '../hooks/useInput';
import { Application, NewApplication } from '../types';
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='position'>Position</label>
        <input
          name='position'
          required
          {...positionTitle}
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
          handleChange={getStatus}
        />
      </div>
      <div>
        <label htmlFor='files'>Files</label>
        <FileUploader
          handleChange={getConvertedFiles}
          initFiles={files}
        />
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
      <button type='submit'>Save</button>
    </form>
  );
};

export default ApplicationForm;
