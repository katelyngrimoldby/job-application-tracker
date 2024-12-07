import { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState<FileList>();

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      file: FileList;
    };

    setFiles(target.files ? target.files : undefined);
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
