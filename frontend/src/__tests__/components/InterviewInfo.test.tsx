import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '../util/matchMedia';
import { testInterviews } from '../util/testData';
import InterviewInfo from '../../components/InterviewInfo';

describe('ApplicationInfo component', () => {
  const interview = testInterviews[0];

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
    expect(screen.getByTestId('position')).toHaveTextContent('Error');
    expect(screen.getByTestId('company')).toHaveTextContent('Error');
    expect(screen.getByText(`With ${interview.contact}`)).toBeInTheDocument();
    expect(screen.getByText(`January 5, 2025 at 12:30`)).toBeInTheDocument();
    expect(screen.getByText('Application')).toHaveAttribute(
      'href',
      `/applications/2`
    );
    expect(screen.getByText('Website')).toHaveAttribute('href', 'example.com');
  });

  it('Links to correct edit page', () => {
    const editButton = screen.getByTestId('edit');

    expect(editButton.getAttribute('href')).toBe(
      `/interviews/${interview.id}/edit`
    );
  });

  it('Sends callback for deletion', async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getByTestId('delete');

    await user.click(deleteButton);

    expect(mockDelete.mock.calls).toHaveLength(1);
  });
});
