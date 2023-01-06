import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Job } from '../../types';
import userEvent from '@testing-library/user-event';
import JobListItem from '../../components/JobList/Item';

describe('JobListItem component', () => {
  const job: Job = {
    applied: '2023-01-05T00:00:00.000Z',
    company: 'A Company',
    compensation: '50k/yr',
    id: 2,
    interviews: [],
    jobDescription: '<p>Test</p>',
    location: 'Remote',
    positionTitle: 'Junior Web Developer',
    status: 'applied',
    userId: 1,
  };

  const mockDelete = vi.fn();

  beforeEach(() => {
    // NOTE the BrowserRouter component serves no purpose in this test suite aside from appeasing the Link components present.
    render(
      <BrowserRouter>
        <JobListItem
          job={job}
          handleDelete={mockDelete}
        />
      </BrowserRouter>
    );
  });

  it('Displays surface-level information', () => {
    expect(screen.getByText(job.positionTitle)).toBeInTheDocument();
    expect(screen.getByText(job.company)).toBeInTheDocument();
    expect(screen.getByText(job.location)).toBeInTheDocument();
    expect(screen.getByText(job.compensation)).toBeInTheDocument();
    expect(
      screen.getByText(`Applied on ${job.applied.substring(0, 10)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(job.status)).toBeInTheDocument();
  });

  it('Links to the correct Job page', () => {
    const viewButton = screen.getByText('View Application');

    expect(viewButton.getAttribute('href')).toBe(`/jobs/${job.id}`);
  });

  it('Links to the correct edit page', () => {
    const editButton = screen.getByLabelText('Edit Application');

    expect(editButton.getAttribute('href')).toBe(`/jobs/${job.id}/edit`);
  });

  it('Calls deletion callback with correct id', async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getByLabelText('Delete Application');

    await user.click(deleteButton);

    expect(mockDelete.mock.calls).toHaveLength(1);
    expect(mockDelete.mock.calls[0][0]).toBe(job.id);
  });
});
