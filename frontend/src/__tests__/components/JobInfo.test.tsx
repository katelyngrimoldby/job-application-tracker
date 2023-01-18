import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Job } from '../../types';
import userEvent from '@testing-library/user-event';
import JobInfo from '../../components/JobInfo';

describe('JobInfo component', () => {
  const job: Job = {
    applied: '2023-01-05T00:00:00.000Z',
    company: 'A Company',
    compensation: '50k/yr',
    id: 2,
    interviews: ['2022-12-08T00:00:00.000Z', '2022-11-08T00:00:00.000Z'],
    jobDescription: '',
    location: 'Remote',
    positionTitle: 'Junior Web Developer',
    status: 'applied',
    notes: '',
    contacts: [
      { name: 'Katelyn', email: 'katelyng@gmail.com', number: '5877082468' },
    ],
    userId: 1,
  };

  const mockDelete = vi.fn();

  beforeEach(() => {
    // NOTE the BrowserRouter component serves no purpose in this test suite aside from appeasing the Link components present.
    render(
      <BrowserRouter>
        <JobInfo
          job={job}
          handleDelete={mockDelete}
        />
      </BrowserRouter>
    );
  });

  it('Renders all information', () => {
    expect(screen.getByText(job.positionTitle)).toBeInTheDocument();
    expect(screen.getByText(job.company)).toBeInTheDocument();
    expect(
      screen.getByText(`Applied on ${job.applied.substring(0, 10)}`)
    ).toBeInTheDocument();

    for (const interview of job.interviews) {
      expect(screen.getByText(interview.substring(0, 10))).toBeInTheDocument();
    }

    expect(screen.getByText(job.location)).toBeInTheDocument();
    expect(screen.getByText(job.compensation)).toBeInTheDocument();
    expect(screen.getByText(job.status)).toBeInTheDocument();

    for (const contact of job.contacts) {
      expect(screen.getByText(contact.name)).toBeInTheDocument();

      if (contact.email) {
        expect(screen.getByText(contact.email)).toBeInTheDocument();
      }

      if (contact.number) {
        expect(screen.getByText(contact.number)).toBeInTheDocument();
      }
    }
  });

  it('Links to correct edit page', () => {
    const editButton = screen.getByLabelText('Edit Application');

    expect(editButton.getAttribute('href')).toBe(`/jobs/${job.id}/edit`);
  });

  it('Sends empty callback for deletion', async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getByLabelText('Delete Application');

    await user.click(deleteButton);

    expect(mockDelete.mock.calls).toHaveLength(1);
  });
});
