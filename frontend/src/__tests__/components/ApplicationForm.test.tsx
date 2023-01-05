import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '../../components/ApplicationForm';

type Status = 'applied' | 'interviewing' | 'offered' | 'rejected';

//For the sake of unit testing, no tests with the WYSIWYG editor will be written here.

const getFormattedDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;

  return `${new Date().getFullYear()}-${month < 10 ? '0' + month : month}-${
    date < 10 ? '0' + date : date
  }`;
};

describe('ApplicationForm component', () => {
  const mockCreate = vi.fn();
  const mockUpdate = vi.fn();

  describe('New application', () => {
    const interviewDates = ['2022-12-08', '2022-11-08', '2022-10-08'];

    beforeEach(() => {
      render(
        <ApplicationForm
          handleAddition={mockCreate}
          handleUpdate={mockUpdate}
        />
      );
    });

    afterEach(() => vi.clearAllMocks());

    describe('Interview input', () => {
      it('Displays a list of added interview dates', async () => {
        const user = userEvent.setup();
        const interviewInput = document.getElementById('interviewDate');
        const button = document.getElementById('addButton');

        expect(interviewInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        if (interviewInput && button) {
          await user.clear(interviewInput);
          fireEvent.change(interviewInput, { target: { value: '2022-12-08' } });
          await user.click(button);

          expect(screen.getByTestId('interview0').textContent).toContain(
            '2022-12-08'
          );
        }
      });

      it('deletes date on button click', async () => {
        const user = userEvent.setup();
        const interviewInput = document.getElementById('interviewDate');
        const addButton = document.getElementById('addButton');

        expect(interviewInput).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();

        if (interviewInput && addButton) {
          await user.clear(interviewInput);
          fireEvent.change(interviewInput, {
            target: { value: '2022-12-08' },
          });
          await user.click(addButton);

          const interview = screen.getByTestId('interview0');
          const deleteButton = within(interview).getByRole('button');
          await user.click(deleteButton);

          expect(interview).not.toBeInTheDocument();
        }
      });

      it('Appends further submissions to bottom of list', async () => {
        const user = userEvent.setup();
        const interviewInput = document.getElementById('interviewDate');
        const button = document.getElementById('addButton');

        expect(interviewInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        if (interviewInput && button) {
          for (const interview of interviewDates) {
            await user.clear(interviewInput);
            fireEvent.change(interviewInput, {
              target: { value: interview },
            });
            await user.click(button);
          }

          expect(screen.getByTestId('interview0').textContent).toContain(
            '2022-12-08'
          );
          expect(screen.getByTestId('interview1').textContent).toContain(
            '2022-11-08'
          );

          expect(screen.getByTestId('interview2').textContent).toContain(
            '2022-10-08'
          );
        }
      });

      it('Successfully preserves lower entries on deletion', async () => {
        const user = userEvent.setup();
        const interviewInput = document.getElementById('interviewDate');
        const button = document.getElementById('addButton');

        expect(interviewInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        if (interviewInput && button) {
          for (const interview of interviewDates) {
            await user.clear(interviewInput);
            fireEvent.change(interviewInput, {
              target: { value: interview },
            });
            await user.click(button);
          }

          const interview0 = screen.getByTestId('interview0');
          const interview1 = screen.getByTestId('interview1');
          const interview2 = screen.getByTestId('interview2');

          const deleteButton = within(interview1).getByRole('button');
          await user.click(deleteButton);

          expect(interview0.textContent).toContain('2022-12-08');
          expect(interview1.textContent).toContain('2022-10-08');
          expect(interview2).not.toBeInTheDocument();
        }
      });
    });

    describe('Form submission', () => {
      const submission = {
        positionTitle: 'Test',
        company: 'Test',
        location: 'Remote',
        applied: '2022-09-10',
        compensation: '500k/yr',
        status: 'offered',
        interviews: interviewDates,
        jobDescription: '',
      };

      it('Successfully calls callback with content', async () => {
        const user = userEvent.setup();
        const positionInput = screen.getByPlaceholderText('Position');
        const companyInput = screen.getByPlaceholderText('Company');
        const locationInput = screen.getByPlaceholderText('Location');
        const compensationInput = screen.getByPlaceholderText('Compensation');
        const appliedInput = screen.getByLabelText('Applied');
        const statusSelect = screen.getByLabelText('Status');
        const interviewInput = screen.getByLabelText('Interview Dates');
        const addButton = screen.getByText('Add');
        const submitButton = screen.getByText('Submit');

        await user.type(positionInput, submission.positionTitle);
        await user.type(companyInput, submission.company);
        await user.type(locationInput, submission.location);
        await user.type(compensationInput, submission.compensation);

        await user.clear(appliedInput);
        fireEvent.change(appliedInput, {
          target: { value: submission.applied },
        });

        await user.selectOptions(statusSelect, submission.status);

        for (const interview of interviewDates) {
          await user.clear(interviewInput);
          fireEvent.change(interviewInput, {
            target: { value: interview },
          });
          await user.click(addButton);
        }

        await user.click(submitButton);

        expect(mockCreate.mock.calls).toHaveLength(1);
        expect(mockCreate.mock.calls[0][0]).toEqual(submission);
      });

      it('Does not call callback if text inputs are empty', async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByText('Submit');

        await user.click(submitButton);
        expect(mockCreate.mock.calls).toHaveLength(0);
      });

      it('Submits with default selection and applied without user input', async () => {
        const user = userEvent.setup();
        const positionInput = screen.getByPlaceholderText('Position');
        const companyInput = screen.getByPlaceholderText('Company');
        const locationInput = screen.getByPlaceholderText('Location');
        const compensationInput = screen.getByPlaceholderText('Compensation');
        const interviewInput = screen.getByLabelText('Interview Dates');
        const addButton = screen.getByText('Add');
        const submitButton = screen.getByText('Submit');

        await user.type(positionInput, submission.positionTitle);
        await user.type(companyInput, submission.company);
        await user.type(locationInput, submission.location);
        await user.type(compensationInput, submission.compensation);

        for (const interview of interviewDates) {
          await user.clear(interviewInput);
          fireEvent.change(interviewInput, {
            target: { value: interview },
          });
          await user.click(addButton);
        }

        await user.click(submitButton);

        expect(mockCreate.mock.calls[0][0].applied).toBe(getFormattedDate());
        expect(mockCreate.mock.calls[0][0].status).toBe('applied');
      });

      it('Submits empty array when no interviews are saved', async () => {
        const user = userEvent.setup();
        const positionInput = screen.getByPlaceholderText('Position');
        const companyInput = screen.getByPlaceholderText('Company');
        const locationInput = screen.getByPlaceholderText('Location');
        const compensationInput = screen.getByPlaceholderText('Compensation');
        const submitButton = screen.getByText('Submit');

        await user.type(positionInput, submission.positionTitle);
        await user.type(companyInput, submission.company);
        await user.type(locationInput, submission.location);
        await user.type(compensationInput, submission.compensation);

        await user.click(submitButton);

        expect(mockCreate.mock.calls[0][0].interviews).toEqual([]);
      });
    });
  });

  describe('Editing application', () => {
    const content = {
      positionTitle: 'Test',
      company: 'Test',
      location: 'Remote',
      applied: '2022-09-10T00:00:00.000Z',
      compensation: '500k/yr',
      status: 'offered' as Status,
      interviews: [
        '2022-12-08T00:00:00.000Z',
        '2022-11-08T00:00:00.000Z',
        '2022-10-08T00:00:00.000Z',
      ],
      jobDescription: '',
      id: 10,
      userId: 2,
    };

    const submission = {
      positionTitle: 'Changed',
      company: 'Changed',
      location: 'Changed',
      applied: '2022-09-11',
      compensation: '200k/yr',
      status: 'rejected',
      interviews: ['2022-12-08T00:00:00.000Z', '2022-11-08T00:00:00.000Z'],
      jobDescription: '',
    };

    const unchangedSubmission = {
      positionTitle: 'Test',
      company: 'Test',
      location: 'Remote',
      applied: '2022-09-10',
      compensation: '500k/yr',
      status: 'offered' as Status,
      interviews: [
        '2022-12-08T00:00:00.000Z',
        '2022-11-08T00:00:00.000Z',
        '2022-10-08T00:00:00.000Z',
      ],
      jobDescription: '',
    };

    beforeEach(() => {
      render(
        <ApplicationForm
          content={content}
          handleAddition={mockCreate}
          handleUpdate={mockUpdate}
        />
      );
    });

    afterEach(() => vi.clearAllMocks());

    it('Populates form with content', () => {
      const positionInput = screen.getByPlaceholderText('Position');
      const companyInput = screen.getByPlaceholderText('Company');
      const locationInput = screen.getByPlaceholderText('Location');
      const compensationInput = screen.getByPlaceholderText('Compensation');
      const appliedInput = screen.getByLabelText('Applied');
      const interview0 = screen.getByTestId('interview0');
      const interview1 = screen.getByTestId('interview1');
      const interview2 = screen.getByTestId('interview2');

      expect(positionInput.getAttribute('value')).toBe(content.positionTitle);
      expect(companyInput.getAttribute('value')).toBe(content.company);
      expect(locationInput.getAttribute('value')).toBe(content.location);
      expect(compensationInput.getAttribute('value')).toBe(
        content.compensation
      );
      expect(appliedInput.getAttribute('value')).toBe(
        content.applied.substring(0, 10)
      );
      expect(interview0.textContent).toBe(
        content.interviews[0].substring(0, 10) + ' '
      );
      expect(interview1.textContent).toBe(
        content.interviews[1].substring(0, 10) + ' '
      );
      expect(interview2.textContent).toBe(
        content.interviews[2].substring(0, 10) + ' '
      );
    });

    it('Submits changed content successfully', async () => {
      const user = userEvent.setup();
      const positionInput = screen.getByPlaceholderText('Position');
      const companyInput = screen.getByPlaceholderText('Company');
      const locationInput = screen.getByPlaceholderText('Location');
      const compensationInput = screen.getByPlaceholderText('Compensation');
      const appliedInput = screen.getByLabelText('Applied');
      const statusSelect = screen.getByLabelText('Status');
      const interview2 = screen.getByTestId('interview2');
      const submitButton = screen.getByText('Submit');

      await user.clear(positionInput);
      await user.clear(companyInput);
      await user.clear(locationInput);
      await user.clear(compensationInput);

      await user.type(positionInput, submission.positionTitle);
      await user.type(companyInput, submission.company);
      await user.type(locationInput, submission.location);
      await user.type(compensationInput, submission.compensation);

      await user.clear(appliedInput);
      fireEvent.change(appliedInput, {
        target: { value: submission.applied },
      });

      await user.selectOptions(statusSelect, submission.status);

      await user.click(within(interview2).getByRole('button'));

      await user.click(submitButton);

      expect(mockUpdate.mock.calls).toHaveLength(1);
      expect(mockUpdate.mock.calls[0]).toEqual([submission, 10]);
    });
    it('Submits original content if no user inputs made', async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByText('Submit');

      await user.click(submitButton);

      expect(mockUpdate.mock.calls).toHaveLength(1);
      expect(mockUpdate.mock.calls[0]).toEqual([unchangedSubmission, 10]);
    });
  });
});
