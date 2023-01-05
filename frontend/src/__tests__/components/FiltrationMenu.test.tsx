import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FiltrationMenu from '../../components/FiltrationMenu';

describe('FiltrationMenu component', () => {
  const mockChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    render(<FiltrationMenu handleChange={mockChange} />);
  });

  it('Sends callback with correct name & value (Filter)', async () => {
    const user = userEvent.setup();
    const filterRadio = screen.getByLabelText('applied');

    await user.click(filterRadio);

    expect(mockChange.mock.calls).toHaveLength(1);
    expect(mockChange.mock.calls[0]).toEqual(['filter', 'applied']);
  });

  it('Sends callback with correct name & value (Sort)', async () => {
    const user = userEvent.setup();
    const sortRadio = screen.getByLabelText('Oldest');

    await user.click(sortRadio);
    expect(mockChange.mock.calls).toHaveLength(1);
    expect(mockChange.mock.calls[0]).toEqual(['sort', 'oldest']);
  });
});
