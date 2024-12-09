import { useState } from 'react';
import useFileConversion from '../hooks/useFileConversion';

const FileUploader = ({
  handleChange,
  initFiles,
}: {
  handleChange: (files: string[]) => void;
  initFiles: string[];
}) => {
  const { filesToBase64, filesToFile } = useFileConversion();
  const [files, setFiles] = useState<File[]>(filesToFile(initFiles));

  const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      file: FileList;
    };

    setFiles(Array.from(target.file || []));

    const base64Files = await filesToBase64(files);
    handleChange(base64Files);
  };

  return (
    <input
      name='files'
      type='file'
      multiple
      onChange={handleFileChange}
    />
  );
};

export default FileUploader;
