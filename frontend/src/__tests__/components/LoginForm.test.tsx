import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/LoginForm';

describe('LoginForm component', () => {
  const submission = {
    username: 'testuser',
    password: 'testpassword',
  };

  const mockSubmit = vi.fn();

  beforeEach(() => {
    render(<LoginForm handleLogin={mockSubmit} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Sends callback when submitted', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button');

    await user.type(usernameInput, submission.username);
    await user.type(passwordInput, submission.password);

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual(submission);
  });

  it('Does not send callback with empty inputs', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button');

    await user.click(submitButton);

    expect(mockSubmit.mock.calls).toHaveLength(0);
  });
});
