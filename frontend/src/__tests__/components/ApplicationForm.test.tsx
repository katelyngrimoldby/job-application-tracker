import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '../../components/ApplicationForm';

describe('ApplicationForm component', () => {
  const mockCreate = vi.fn();
  const mockUpdate = vi.fn();

  describe('New application', () => {
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
    });

    // it('Deletes interview on button click', () => {
    //   const interviewInput = document.getElementById('interviewDate');
    //   const addButton = interviewInput?.querySelector('button');

    //   expect(interviewInput).not.toBeNull();

    //   if (interviewInput && addButton) {
    //     userEvent.type(interviewInput, '08/12/2022');
    //     userEvent.click(addButton);

    //     const interview = document.querySelector('interview');
    //     const deleteButton = interview?.querySelector('button');

    //     if (deleteButton) {
    //       userEvent.click(deleteButton);
    //       expect(interview).toBeNull();
    //     }
    //   }
    // });

    // it('Appends new dates to bottom of the list', () => {
    //   const interviewInput = document.getElementById('interviewDate');
    //   const addButton = interviewInput?.querySelector('button');

    //   expect(interviewInput).not.toBeNull();

    //   if (interviewInput && addButton) {
    //     userEvent.type(interviewInput, '08/12/2022');
    //     userEvent.click(addButton);

    //     userEvent.type(interviewInput, '12/12/2022');
    //     userEvent.click(addButton);
    //   }
    // });
  });
});
