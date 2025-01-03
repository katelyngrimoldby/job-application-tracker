import { ApplicationFile, BasicFile, InterviewFile } from '../types';

const useFileConversion = () => {
  const toBase64 = async (file: File): Promise<BasicFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          fileData: reader.result as string,
          filename: file.name,
        } as BasicFile);
      reader.onerror = (error) => reject(error);
    });
  };

  const filesToBase64 = async (files: File[]) => {
    const base64Files = await Promise.all(
      files.map(async (file) => {
        const base64 = await toBase64(file);
        return base64;
      })
    );

    return base64Files;
  };

  const toFile = (base64: string, filename: string) => {
    const base64Data = base64.replace(/^data:.+;base64,/, '');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, { type: 'application/pdf' });
    return file;
  };

  const filesToFile = (files: ApplicationFile[] | InterviewFile[]) => {
    return files.map((file) => toFile(file.fileData, file.filename));
  };

  return { filesToBase64, filesToFile };
};

export default useFileConversion;
