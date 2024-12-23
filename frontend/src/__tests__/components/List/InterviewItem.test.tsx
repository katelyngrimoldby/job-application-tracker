import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Interview, Application } from '../../../types';
import ListInterviewItem from '../../../components/List/InterviewItem';

describe('ListInterviewItem component', () => {
  const interview: Interview = {
    id: 2,
    notes: '',
    userId: 1,
    time: new Date(2025, 0, 5, 12, 30),
    applicationId: 0,
    contact: 'Unknown',
    website: 'example.com',
  };

  const application: Application = {
    applyDate: new Date(2023, 11, 31),
    company: 'A Company',
    id: 2,
    location: 'Remote',
    positionTitle: 'Junior Web Developer',
    status: 'applied',
    notes: '',
    jobId: 'gfer5678',
    userId: 1,
    assessmentDate: null,
    interviewDate: null,
    offerDate: null,
    rejectionDate: null,
  };

  beforeEach(() => {
    // NOTE the BrowserRouter component serves no purpose in this test suite aside from appeasing the Link components present.
    render(
      <BrowserRouter>
        <ListInterviewItem
          interview={interview}
          application={application}
        />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays surface-level information', () => {
    expect(screen.getByText(application.positionTitle)).toBeInTheDocument();
    expect(screen.getByText(application.company)).toBeInTheDocument();
    expect(screen.getByText('Jan. 5th')).toBeInTheDocument();
    expect(
      screen.getByText(interview.contact ? interview.contact : 'Unknown')
    ).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });

  it('Links to the correct Interview page', () => {
    const viewButton = screen.getByText('View Interview');

    expect(viewButton.getAttribute('href')).toBe(`/interviews/${interview.id}`);
  });
});
