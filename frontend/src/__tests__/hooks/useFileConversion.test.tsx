import { renderHook } from '@testing-library/react';
import { testFiles } from '../util/testData';
import useFileConversion from '../../hooks/useFileConversion';

describe('useFileConversion testing', () => {
  const { result } = renderHook(useFileConversion);
  const sampleFiles = [
    new File(['hello'], 'hello.pdf', { type: 'application/pdf' }),
    new File(['world'], 'world.pdf', { type: 'application/pdf' }),
  ];

  describe('To base64', () => {
    const { filesToBase64 } = result.current;

    it('Returns an array of all files', async () => {
      const converted = await filesToBase64(sampleFiles);
      expect(converted).toHaveLength(2);
    });

    it('Returns an empty array if no files passed', async () => {
      const converted = await filesToBase64([]);

      expect(converted).toHaveLength(0);
    });

    it('Preserves file names', async () => {
      const converted = await filesToBase64(sampleFiles);
      expect(converted[0]).toEqual({
        fileData: expect.any(String),
        filename: 'hello.pdf',
      });
      expect(converted[1]).toEqual({
        fileData: expect.any(String),
        filename: 'world.pdf',
      });
    });
  });

  describe('to File', () => {
    const { filesToFile } = result.current;

    it('Returns an array of all files', () => {
      const converted = filesToFile(
        testFiles.map((file) => {
          return { ...file, id: 0, applicationId: 0 };
        })
      );

      expect(converted).toHaveLength(4);
    });

    it('Returns empty array if no files passed', () => {
      const converted = filesToFile([]);

      expect(converted).toHaveLength(0);
    });

    it('Returns File instances with preserved names in array', () => {
      const converted = filesToFile(
        testFiles.map((file) => {
          return { ...file, id: 0, applicationId: 0 };
        })
      );

      converted.forEach((element, index) => {
        expect(element instanceof File).toBe(true);
        expect(element.name).toBe(testFiles[index].filename);
      });
    });
  });
});
