import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '../util/matchMedia';
import { testInterviews, testApplications } from '../util/testData';
import InterviewInfo from '../../components/InterviewInfo';

describe('ApplicationInfo component', () => {
  const interview = testInterviews[0];

  const application = testApplications[0];

  const mockDelete = vi.fn();

  beforeEach(() => {
    // NOTE the BrowserRouter component serves no purpose in this test suite aside from appeasing the Link components present.
    render(
      <BrowserRouter>
        <InterviewInfo
          interview={interview}
          handleDelete={mockDelete}
        />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Renders all information', () => {
    expect(screen.getByText(application.positionTitle)).toBeInTheDocument();
    expect(screen.getByText(application.company)).toBeInTheDocument();
    expect(
      screen.getByText('Applied on December 31, 2023')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Assessments began January 5, 2024')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Interviews began January 16, 2024')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Offer extended on February 2, 2024')
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Location: ${application.location}`)
    ).toBeInTheDocument();
    expect(screen.getByText('Status: Offered')).toBeInTheDocument();
    expect(screen.getByText(`Job ID: ${application.jobId}`));
  });

  it('Links to correct edit page', () => {
    const editButton = screen.getByTestId('edit');

    expect(editButton.getAttribute('href')).toBe(
      `/applications/${application.id}/edit`
    );
  });

  it('Sends callback for deletion', async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getByTestId('delete');

    await user.click(deleteButton);

    expect(mockDelete.mock.calls).toHaveLength(1);
  });
});
