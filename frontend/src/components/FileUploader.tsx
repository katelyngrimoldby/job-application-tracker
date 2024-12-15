import { useState, useRef } from 'react';
import useFileConversion from '../hooks/useFileConversion';
import styles from '../styles/components/FileUploader.module.css';

const FileUploader = ({
  handleChange,
  initFiles,
}: {
  handleChange: (files: string[]) => void;
  initFiles: string[];
}) => {
  const { filesToBase64, filesToFile } = useFileConversion();
  const [files, setFiles] = useState<File[]>(filesToFile(initFiles));
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileAdd = async (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    const fileArr = [...files, ...Array.from(target.files || [])];

    setFiles(fileArr);

    const base64Files = await filesToBase64(fileArr);
    handleChange(base64Files);
  };

  const handleFileRemove = async (fileName: string) => {
    const fileArr = files.filter((curFile) => curFile.name != fileName);

    setFiles(fileArr);

    const base64Files = await filesToBase64(fileArr);
    handleChange(base64Files);
  };

  return (
    <>
      <button
        type='button'
        className={styles.labelBtn}
        onClick={() => (fileInput.current ? fileInput.current.click() : null)}
      >
        Upload files
      </button>
      <input
        id='files'
        name='files'
        type='file'
        accept='application/pdf'
        multiple
        onChange={handleFileAdd}
        className={styles.input}
        ref={fileInput}
      />
      <ul className={styles.fileList}>
        {files.map((file) => (
          <li key={file.name}>
            <button onClick={() => handleFileRemove(file.name)}>
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FileUploader;
