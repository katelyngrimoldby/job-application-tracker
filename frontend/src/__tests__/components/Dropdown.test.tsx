import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../util/matchMedia';
import Dropdown from '../../components/Dropdown';

describe('Dropdown testing', () => {
  const mockChange = vi.fn();
  const data = [
    { label: 'option 1', value: 'option1' },
    { label: 'option 2', value: 'option2' },
    { label: 'option 3', value: 'option3' },
    { label: 'option 4', value: 'option4' },
  ];

  beforeEach(() => {
    render(
      <Dropdown
        values={data}
        handleChange={mockChange}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays the first value as selected', () => {
    expect(screen.getByLabelText('Select Status')).toHaveTextContent(
      data[0].label
    );
  });

  it('Displays all values as options', () => {
    const options = screen.getAllByRole('option');

    options.forEach((option, index) => {
      expect(option.children[0]).toHaveTextContent(data[index].label);
    });
  });

  it("Passes option's value in callback", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByTestId(data[0].value));
    expect(mockChange.mock.calls[0][0]).toEqual(data[0].value);

    await user.click(screen.getByTestId(data[1].value));
    expect(mockChange.mock.calls[1][0]).toEqual(data[1].value);

    await user.click(screen.getByTestId(data[2].value));
    expect(mockChange.mock.calls[2][0]).toEqual(data[2].value);

    await user.click(screen.getByTestId(data[3].value));
    expect(mockChange.mock.calls[3][0]).toEqual(data[3].value);

    expect(mockChange.mock.calls).toHaveLength(4);
  });
});
