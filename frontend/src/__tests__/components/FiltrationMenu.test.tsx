import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FiltrationMenu from '../../components/FiltrationMenu';

describe('FiltrationMenu component', () => {
  const mockChange = vi.fn();

  beforeEach(() => {
    render(<FiltrationMenu handleChange={mockChange} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
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
