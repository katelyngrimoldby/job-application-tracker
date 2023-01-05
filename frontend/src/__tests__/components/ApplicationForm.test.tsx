import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '../../components/ApplicationForm';

//For the sake of unit testing, no tests with the WYSIWYG editor will be written here.

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
  });
});
