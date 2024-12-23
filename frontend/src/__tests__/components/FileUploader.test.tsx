import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../util/matchMedia';
import FileUploader from '../../components/FileUploader';
import { testFiles } from '../util/testData';

const toFile = (byteChars: string, filename: string) => {
  const byteNumbers = new Array(byteChars.length);

  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], filename, { type: 'application/pdf' });
  return file;
};

describe('FileUploader testing', () => {
  const mockChange = vi.fn();
  const fileToAdd = toFile(testFiles[2].fileData, testFiles[2].filename);

  beforeEach(() => {
    render(
      <FileUploader
        handleChange={mockChange}
        initFiles={[
          { ...testFiles[0], id: 0, applicationId: 1 },
          { ...testFiles[1], id: 0, applicationId: 1 },
        ]}
      />
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Renders names of initial files', () => {
    expect(screen.getByText(testFiles[0].filename)).toBeInTheDocument();
    expect(screen.getByText(testFiles[1].filename)).toBeInTheDocument();
  });

  describe('Adding one file', () => {
    it("Renders the added file's name", async () => {
      const user = userEvent.setup();

      await user.upload(screen.getByTestId('fileInput'), fileToAdd);

      expect(screen.getByText(fileToAdd.name));
    });

    it('Passes file as a binary string in callback', async () => {
      const user = userEvent.setup();

      await user.upload(screen.getByTestId('fileInput'), fileToAdd);

      expect(mockChange.mock.calls).toHaveLength(1);
      expect(mockChange.mock.calls[0][0]).toEqual([
        testFiles[0],
        testFiles[1],
        testFiles[2],
      ]);
    });
  });

  describe('Adding multiple files', () => {
    const secondFileToAdd = toFile(
      testFiles[3].fileData,
      testFiles[3].filename
    );

    it('Renders the added files name', async () => {
      const user = userEvent.setup();

      await user.upload(screen.getByTestId('fileInput'), [
        fileToAdd,
        secondFileToAdd,
      ]);

      expect(screen.getByText(fileToAdd.name));
      expect(screen.getByText(secondFileToAdd.name));
    });

    it('Passes file as a binary string in callback', async () => {
      const user = userEvent.setup();

      await user.upload(screen.getByTestId('fileInput'), [
        fileToAdd,
        secondFileToAdd,
      ]);

      expect(mockChange.mock.calls).toHaveLength(1);
      expect(mockChange.mock.calls[0][0]).toEqual(testFiles);
    });
  });

  describe('Removing a file', () => {
    it('Removes file name from screen', async () => {
      const user = userEvent.setup();
      const file = screen.getByText(testFiles[0].filename);

      await user.click(file);
      expect(file).not.toBeInTheDocument();
    });

    it('Calls the callback without the removed file', async () => {
      const user = userEvent.setup();
      const file = screen.getByText(testFiles[0].filename);

      await user.click(file);
      expect(mockChange.mock.calls).toHaveLength(1);
      expect(mockChange.mock.calls[0][0]).toEqual([testFiles[1]]);
    });
  });
});
