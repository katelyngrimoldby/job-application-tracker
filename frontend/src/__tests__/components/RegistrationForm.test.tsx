import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from '../../components/RegistrationForm';

describe('RegistrationForm component', () => {
  const mockSubmit = vi.fn();

  const submission = {
    name: 'Test',
    username: 'testuser',
    password: 'testpassword',
  };

  beforeEach(() => {
    render(<RegistrationForm handleRegistration={mockSubmit} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Successfully sends callback', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText('Username');
    const nameInput = screen.getByPlaceholderText('Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button');

    await user.type(usernameInput, submission.username);
    await user.type(nameInput, submission.name);
    await user.type(passwordInput, submission.password);
    await user.type(confirmInput, submission.password);

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual(submission);
  });

  it('Does not send callback if passwords are mismatched', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText('Username');
    const nameInput = screen.getByPlaceholderText('Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button');

    await user.type(usernameInput, submission.username);
    await user.type(nameInput, submission.name);
    await user.type(passwordInput, submission.password);
    await user.type(confirmInput, 'wrongpass');

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(0);
  });

  it('Does not send callback if password too short', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText('Username');
    const nameInput = screen.getByPlaceholderText('Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button');

    await user.type(usernameInput, submission.username);
    await user.type(nameInput, submission.name);
    await user.type(passwordInput, 's');
    await user.type(confirmInput, 's');

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(0);
  });

  it('Does not send callback if inputs are empty', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button');

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(0);
  });
});
