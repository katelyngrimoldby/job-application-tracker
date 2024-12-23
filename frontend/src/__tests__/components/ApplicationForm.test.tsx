import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '../../components/ApplicationForm';
import { Application } from '../../types';

type Status =
  | 'applied'
  | 'assessments'
  | 'interviewing'
  | 'offered'
  | 'rejected';

//For the sake of unit testing, no tests with the WYSIWYG editor or file input will be written here.

describe('ApplicationForm component', () => {
  describe('New application', () => {
    const mockCreate = vi.fn();

    beforeEach(() => {
      render(<ApplicationForm handleAddition={mockCreate} />);
    });

    afterEach(() => {
      vi.clearAllMocks();
      cleanup();
    });

    describe('Form submission', () => {
      const submission = {
        positionTitle: 'Test',
        company: 'Test',
        location: 'Remote',
        status: 'offered',
        notes: '',
        jobId: '',
      };

      it('Successfully calls callback with content', async () => {
        const user = userEvent.setup();
        const positionInput = screen.getByLabelText('Position');
        const companyInput = screen.getByLabelText('Company');
        const locationInput = screen.getByLabelText('Location');
        const submitButton = screen.getByRole('button', { name: 'Save' });

        await user.type(positionInput, submission.positionTitle);
        await user.type(companyInput, submission.company);
        await user.type(locationInput, submission.location);
        await user.click(screen.getByTestId('offered'));

        await user.click(submitButton);

        expect(mockCreate.mock.calls).toHaveLength(1);
        expect(mockCreate.mock.calls[0][0]).toEqual({
          ...submission,
          assessmentDate: null,
          interviewDate: null,
          offerDate: expect.any(Date),
          rejectionDate: null,
        });
      });

      it('Does not call callback if text inputs are empty', async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByText('Save');

        await user.click(submitButton);
        expect(mockCreate.mock.calls).toHaveLength(0);
      });

      it('Submits with default selection without user input', async () => {
        const user = userEvent.setup();
        const positionInput = screen.getByLabelText('Position');
        const companyInput = screen.getByLabelText('Company');
        const locationInput = screen.getByLabelText('Location');

        const submitButton = screen.getByText('Save');

        await user.type(positionInput, submission.positionTitle);
        await user.type(companyInput, submission.company);
        await user.type(locationInput, submission.location);

        await user.click(submitButton);

        expect(mockCreate.mock.calls[0][0].status).toBe('applied');
      });
    });
  });

  describe('Editing application', () => {
    const mockUpdate = vi.fn();

    const content = {
      positionTitle: 'Test',
      company: 'Test',
      location: 'Remote',
      status: 'offered' as Status,
      notes: '',
      jobId: '',
      applyDate: new Date(2024, 10, 23),
      assessmentDate: null,
      interviewDate: null,
      offerDate: new Date(2024, 10, 25),
      rejectionDate: null,
      id: 10,
      userId: 2,
    } as Application;

    const submission = {
      positionTitle: 'Changed',
      company: 'Changed',
      location: 'Changed',
      status: 'rejected',
      notes: '',
      jobId: '465432',
    };

    const unchangedSubmission = {
      positionTitle: 'Test',
      company: 'Test',
      location: 'Remote',
      status: 'offered' as Status,
      notes: '',
      jobId: '',
    };

    beforeEach(() => {
      render(
        <ApplicationForm
          content={content}
          handleUpdate={mockUpdate}
        />
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Populates form with content', () => {
      const positionInput = screen.getByLabelText('Position');
      const companyInput = screen.getByLabelText('Company');
      const locationInput = screen.getByLabelText('Location');

      expect(positionInput.getAttribute('value')).toBe(content.positionTitle);
      expect(companyInput.getAttribute('value')).toBe(content.company);
      expect(locationInput.getAttribute('value')).toBe(content.location);
    });

    it('Submits changed content successfully', async () => {
      const user = userEvent.setup();
      const positionInput = screen.getByLabelText('Position');
      const companyInput = screen.getByLabelText('Company');
      const locationInput = screen.getByLabelText('Location');
      const idInput = screen.getByLabelText('Job ID');
      const submitButton = screen.getByText('Save');

      await user.clear(positionInput);
      await user.clear(companyInput);
      await user.clear(locationInput);

      await user.type(positionInput, submission.positionTitle);
      await user.type(companyInput, submission.company);
      await user.type(locationInput, submission.location);
      await user.type(idInput, submission.jobId);

      await user.click(screen.getByTestId('rejected'));

      await user.click(submitButton);

      expect(mockUpdate.mock.calls).toHaveLength(1);
      expect(mockUpdate.mock.calls[0][0]).toEqual({
        ...submission,
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
      });
    });
    it('Submits original content if no user inputs made', async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByText('Save');

      await user.click(submitButton);

      expect(mockUpdate.mock.calls).toHaveLength(1);
      expect(mockUpdate.mock.calls[0][0]).toEqual({
        ...unchangedSubmission,
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
      });
    });
  });
});
