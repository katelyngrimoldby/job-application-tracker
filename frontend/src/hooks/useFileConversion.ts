import { ApplicationFile, BasicFile, InterviewFile } from '../types';

const useFileConversion = () => {
  const toBytes = (file: File): Promise<BasicFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.replace(/^data:.+;base64,/, '');
        const byteCharacters = atob(base64Data);
        resolve({ fileData: byteCharacters, filename: file.name });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const filesToBytes = async (files: File[]) => {
    const base64Files = await Promise.all(
      files.map(async (file) => {
        const base64 = await toBytes(file);
        return base64;
      })
    );

    return base64Files;
  };

  const toFile = (byteChars: string, filename: string) => {
    const byteNumbers = new Array(byteChars.length);

    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, { type: 'application/pdf' });
    return file;
  };

  const filesToFile = (files: ApplicationFile[] | InterviewFile[]) => {
    return files.map((file) => toFile(file.fileData, file.filename));
  };

  return { filesToBytes, filesToFile };
};

export default useFileConversion;
