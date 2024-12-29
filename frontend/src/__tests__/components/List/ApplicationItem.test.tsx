import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Application } from '../../../types';
import ListApplicationItem from '../../../components/List/ApplicationItem';

describe('ListApplicationItem component', () => {
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
        <ListApplicationItem application={application} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays surface-level information', () => {
    expect(screen.getByText(application.positionTitle)).toBeInTheDocument();
    expect(screen.getByText(application.company)).toBeInTheDocument();
    expect(screen.getByText('Dec. 31st')).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
  });

  it('Links to the correct Application page', () => {
    const viewButton = screen.getByText('View Application');

    expect(viewButton.getAttribute('href')).toBe(
      `/applications/${application.id}`
    );
  });
});
